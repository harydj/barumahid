import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = registerSchema.parse(body)

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Check if phone already exists (if provided)
    if (data.phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { phone: data.phone },
      })

      if (existingPhone) {
        return NextResponse.json(
          { error: 'Phone number already registered' },
          { status: 400 }
        )
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        password: hashedPassword,
        role: 'user',
        isVerified: false,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        role: true,
      },
    })

    // Create user profile
    await prisma.userProfile.create({
      data: {
        userId: user.id,
      },
    })

    // Create user verification record
    await prisma.userVerification.create({
      data: {
        userId: user.id,
      },
    })

    // Create rent-to-own program
    await prisma.rentToOwnProgram.create({
      data: {
        userId: user.id,
        status: 'ngekos',
        ownershipBalance: 0,
      },
    })

    return NextResponse.json(
      {
        user,
        message: 'Registration successful',
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error registering user:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}

