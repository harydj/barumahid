import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'user@example.com' // TODO: Get from auth session

    const user = await prisma.user.findUnique({
      where: { email: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const program = await prisma.rentToOwnProgram.findUnique({
      where: { userId: user.id },
      include: {
        rentalContract: {
          include: {
            kos: true,
          },
        },
        ownershipBalances: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        paymentHistory: {
          orderBy: { paymentDate: 'desc' },
          take: 10,
        },
      },
    })

    if (!program) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(program)
  } catch (error) {
    console.error('Error fetching rent-to-own program:', error)
    return NextResponse.json(
      { error: 'Failed to fetch program data' },
      { status: 500 }
    )
  }
}


