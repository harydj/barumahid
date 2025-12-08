import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { emailOrPhone, password } = body

    if (!emailOrPhone || !password) {
      return NextResponse.json(
        { error: 'Email/Phone and password are required' },
        { status: 400 }
      )
    }

    const user = await authenticateUser(emailOrPhone, password)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email/phone or password' },
        { status: 401 }
      )
    }

    // Return user data (in production, you'd set a session/JWT token here)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Error authenticating user:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

