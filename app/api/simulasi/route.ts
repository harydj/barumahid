import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const simulationSchema = z.object({
  monthlyRent: z.number().min(0),
  ownershipPercentage: z.number().min(0).max(100),
  targetHousePrice: z.number().min(0),
  rentDuration: z.number().min(1), // in months
  userId: z.string().nullable().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = simulationSchema.parse(body)

    // Calculate simulation
    const monthlyOwnershipAmount = (data.monthlyRent * data.ownershipPercentage) / 100
    const totalOwnershipAmount = monthlyOwnershipAmount * data.rentDuration
    const estimatedMonths = data.targetHousePrice > 0
      ? Math.ceil(data.targetHousePrice / monthlyOwnershipAmount)
      : data.rentDuration

    // Create simulation record
    const simulation = await prisma.simulation.create({
      data: {
        userId: data.userId ?? null,
        monthlyRent: data.monthlyRent,
        ownershipPercentage: data.ownershipPercentage,
        targetHousePrice: data.targetHousePrice,
        rentDuration: data.rentDuration,
        estimatedBalance: totalOwnershipAmount,
        estimatedMonths,
      },
    })

    // Generate monthly results
    const results = []
    let currentBalance = 0
    for (let month = 1; month <= Math.min(data.rentDuration, estimatedMonths); month++) {
      currentBalance += monthlyOwnershipAmount
      results.push({
        month,
        balance: currentBalance,
        totalPaid: data.monthlyRent * month,
      })
    }

    // Save results
    await prisma.simulationResult.createMany({
      data: results.map((r) => ({
        simulationId: simulation.id,
        month: r.month,
        balance: r.balance,
        totalPaid: r.totalPaid,
      })),
    })

    return NextResponse.json({
      simulation: {
        id: simulation.id,
        estimatedBalance: totalOwnershipAmount,
        estimatedMonths,
      },
      results,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error calculating simulation:', error)
    return NextResponse.json(
      { error: 'Failed to calculate simulation' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const simulations = await prisma.simulation.findMany({
      where: { userId },
      include: {
        results: {
          orderBy: { month: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    return NextResponse.json(simulations)
  } catch (error) {
    console.error('Error fetching simulations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch simulations' },
      { status: 500 }
    )
  }
}

