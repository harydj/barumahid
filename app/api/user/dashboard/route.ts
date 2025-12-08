import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get user from request (in production, get from session/JWT)
    const userId = request.headers.get('x-user-id') || 'user@example.com' // TODO: Get from auth session

    // Find user by email (temporary - should use session)
    const user = await prisma.user.findUnique({
      where: { email: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get rent-to-own program
    const program = await prisma.rentToOwnProgram.findUnique({
      where: { userId: user.id },
    })

    if (!program) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      )
    }

    // Get rental contract
    const contract = await prisma.rentalContract.findFirst({
      where: {
        userId: user.id,
        status: 'active',
      },
      orderBy: { createdAt: 'desc' },
    })

    // Calculate stats
    const payments = await prisma.paymentHistory.findMany({
      where: {
        contractId: contract?.id,
      },
      orderBy: { paymentDate: 'desc' },
      take: 5,
    })

    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0)
    const monthsActive = contract
      ? Math.floor((new Date().getTime() - new Date(contract.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))
      : 0

    const progressPercentage = program.targetBalance
      ? (program.ownershipBalance / program.targetBalance) * 100
      : 0

    return NextResponse.json({
      program: {
        status: program.status,
        ownershipBalance: program.ownershipBalance,
        targetBalance: program.targetBalance,
      },
      recentPayments: payments.map((p) => ({
        id: p.id,
        amount: p.amount,
        ownershipAmount: p.ownershipAmount,
        paymentDate: p.paymentDate.toISOString(),
        status: p.status,
      })),
      stats: {
        totalPaid,
        monthsActive,
        progressPercentage: Math.min(progressPercentage, 100),
      },
    })
  } catch (error) {
    console.error('Error fetching dashboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}

