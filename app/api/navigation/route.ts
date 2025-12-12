import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const links = await prisma.navigationLink.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(links)
  } catch (error) {
    console.error('Error fetching navigation links:', error)
    return NextResponse.json(
      { error: 'Failed to fetch navigation links' },
      { status: 500 }
    )
  }
}


