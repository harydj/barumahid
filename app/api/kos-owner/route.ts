import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const email = searchParams.get('email')

    if (!userId && !email) {
      return NextResponse.json(
        { error: 'User ID or email is required' },
        { status: 400 }
      )
    }

    let userEmail = email

    // If userId provided, get user email first
    if (userId && !email) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      })

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      userEmail = user.email
    }

    // Find KosOwner by email
    const owner = await prisma.kosOwner.findUnique({
      where: { email: userEmail! },
    })

    if (!owner) {
      return NextResponse.json(
        { error: 'Kos owner not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(owner)
  } catch (error) {
    console.error('Error fetching kos owner:', error)
    return NextResponse.json(
      { error: 'Failed to fetch kos owner' },
      { status: 500 }
    )
  }
}

