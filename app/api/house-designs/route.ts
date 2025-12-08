import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const designs = await prisma.houseDesign.findMany({
      where: { status: 'active' },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(designs)
  } catch (error) {
    console.error('Error fetching house designs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch house designs' },
      { status: 500 }
    )
  }
}

