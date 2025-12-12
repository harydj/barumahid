import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'user@example.com' // TODO: Get from auth session

    const user = await prisma.user.findUnique({
      where: { email: userId },
      include: {
        profile: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'user@example.com' // TODO: Get from auth session
    const body = await request.json()

    const user = await prisma.user.findUnique({
      where: { email: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: body.name,
        phone: body.phone,
      },
    })

    // Update or create profile
    await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: {
        ktpNumber: body.ktpNumber,
        address: body.address,
        city: body.city,
        province: body.province,
        postalCode: body.postalCode,
        birthDate: body.birthDate ? new Date(body.birthDate) : null,
        gender: body.gender,
        occupation: body.occupation,
      },
      create: {
        userId: user.id,
        ktpNumber: body.ktpNumber,
        address: body.address,
        city: body.city,
        province: body.province,
        postalCode: body.postalCode,
        birthDate: body.birthDate ? new Date(body.birthDate) : null,
        gender: body.gender,
        occupation: body.occupation,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}


