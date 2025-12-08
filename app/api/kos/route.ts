import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const type = searchParams.get('type') // putra, putri, campur
    const roomType = searchParams.get('roomType')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const isPartner = searchParams.get('isPartner') === 'true'
    const ownerId = searchParams.get('ownerId') // For kos_owner to see their own kos

    const where: any = {
      status: 'active',
    }

    // If ownerId is provided, filter by owner (for kos_owner admin)
    if (ownerId) {
      where.ownerId = ownerId
      // Remove status filter for owner view (they can see all statuses)
      delete where.status
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' }
    }

    if (type) {
      where.type = type
    }

    if (roomType) {
      where.roomType = roomType
    }

    if (minPrice || maxPrice) {
      where.priceMonthly = {}
      if (minPrice) {
        where.priceMonthly.gte = parseFloat(minPrice)
      }
      if (maxPrice) {
        where.priceMonthly.lte = parseFloat(maxPrice)
      }
    }

    if (isPartner) {
      where.isBarumahIDPartner = true
    }

    const kosList = await prisma.kos.findMany({
      where,
      include: {
        owner: true,
        facilities: {
          orderBy: { order: 'asc' },
        },
        images: {
          where: { isPrimary: true },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(kosList)
  } catch (error) {
    console.error('Error fetching kos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch kos list' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, address, city, province, postalCode, priceMonthly, priceYearly, type, roomType, isBarumahIDPartner, ownershipPercentage, ownerId } = body

    // Generate slug from name
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    const kos = await prisma.kos.create({
      data: {
        name,
        slug,
        description: description || '',
        address,
        city,
        province,
        postalCode: postalCode || null,
        priceMonthly: parseFloat(priceMonthly),
        priceYearly: priceYearly ? parseFloat(priceYearly) : null,
        type,
        roomType,
        isBarumahIDPartner: isBarumahIDPartner || false,
        ownershipPercentage: ownershipPercentage ? parseFloat(ownershipPercentage) : null,
        ownerId: ownerId || null,
        status: 'active',
      },
    })

    return NextResponse.json(kos, { status: 201 })
  } catch (error) {
    console.error('Error creating kos:', error)
    return NextResponse.json(
      { error: 'Failed to create kos' },
      { status: 500 }
    )
  }
}

