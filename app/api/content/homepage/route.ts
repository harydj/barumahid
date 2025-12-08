import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Find first homepage content (or create if doesn't exist)
    let homePage = await prisma.homePageContent.findFirst({
      orderBy: { createdAt: 'desc' },
    })

    // If no homepage exists, create a default one
    if (!homePage) {
      homePage = await prisma.homePageContent.create({
        data: {
          heroTitle: 'Dari Ngekos, Bisa Punya Rumah',
          heroSubtitle: 'Platform Rent-to-Own BarumahID',
          heroDescription: 'Mulai dari ngekos, akhiri dengan punya rumah. Program rent-to-own inovatif yang mengubah biaya sewa menjadi saldo kepemilikan rumah. Sebagian dari pembayaran sewa bulanan Anda otomatis menjadi saldo yang dapat digunakan untuk membangun rumah di masa depan.',
          stats: [
            { value: '1000+', description: 'User\nTerdaftar' },
            { value: '500+', description: 'Kos Mitra\nAktif' },
            { value: '50+', description: 'Rumah\nTerselesaikan' },
            { value: '95%', description: 'Kepuasan\nUser' },
          ],
        },
      })
    }

    // Ensure stats is always an array
    const response = {
      ...homePage,
      stats: Array.isArray(homePage.stats) ? homePage.stats : [],
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch homepage content', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { heroTitle, heroSubtitle, heroDescription, stats } = body

    // Find first homepage or create if doesn't exist
    let homePage = await prisma.homePageContent.findFirst({
      orderBy: { createdAt: 'desc' },
    })

    const updateData: any = {}
    if (heroTitle !== undefined) updateData.heroTitle = heroTitle
    if (heroSubtitle !== undefined) updateData.heroSubtitle = heroSubtitle
    if (heroDescription !== undefined) updateData.heroDescription = heroDescription
    if (Array.isArray(stats)) updateData.stats = stats

    if (homePage) {
      // Update existing homepage
      homePage = await prisma.homePageContent.update({
        where: { id: homePage.id },
        data: updateData,
      })
    } else {
      // Create new homepage
      homePage = await prisma.homePageContent.create({
        data: {
          heroTitle: heroTitle || 'Dari Ngekos, Bisa Punya Rumah',
          heroSubtitle: heroSubtitle || 'Platform Rent-to-Own BarumahID',
          heroDescription: heroDescription || 'Mulai dari ngekos, akhiri dengan punya rumah. Program rent-to-own inovatif yang mengubah biaya sewa menjadi saldo kepemilikan rumah.',
          stats: stats || [
            { value: '1000+', description: 'User\nTerdaftar' },
            { value: '500+', description: 'Kos Mitra\nAktif' },
            { value: '50+', description: 'Rumah\nTerselesaikan' },
            { value: '95%', description: 'Kepuasan\nUser' },
          ],
        },
      })
    }

    // Ensure stats is always an array
    const result = {
      ...homePage,
      stats: Array.isArray(homePage.stats) ? homePage.stats : [],
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating homepage content:', error)
    return NextResponse.json(
      { error: 'Failed to update homepage content', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
