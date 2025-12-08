import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kos = await prisma.kos.findUnique({
      where: { id: params.id },
      include: {
        owner: true,
        facilities: {
          orderBy: { order: 'asc' },
        },
        images: {
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!kos) {
      return NextResponse.json(
        { error: 'Kos not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(kos)
  } catch (error) {
    console.error('Error fetching kos detail:', error)
    return NextResponse.json(
      { error: 'Failed to fetch kos detail' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, address, city, province, postalCode, priceMonthly, priceYearly, type, roomType, isBarumahIDPartner, ownershipPercentage, status } = body

    // Generate slug from name if name changed
    const existingKos = await prisma.kos.findUnique({ where: { id: params.id } })
    const slug = name && name !== existingKos?.name
      ? name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      : existingKos?.slug

    const kos = await prisma.kos.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description: description || existingKos?.description || '',
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
        status: status || 'active',
      },
    })

    return NextResponse.json(kos)
  } catch (error) {
    console.error('Error updating kos:', error)
    return NextResponse.json(
      { error: 'Failed to update kos' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.kos.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Kos deleted successfully' })
  } catch (error) {
    console.error('Error deleting kos:', error)
    return NextResponse.json(
      { error: 'Failed to delete kos' },
      { status: 500 }
    )
  }
}

