import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().optional(),
  order: z.number().optional().default(0),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const faqs = await prisma.fAQ.findMany({
      where: category ? { category } : undefined,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(faqs)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = faqSchema.parse(body)

    // Get homepage content ID (default to 'homepage-1')
    const homepage = await prisma.homePageContent.findUnique({
      where: { id: 'homepage-1' },
    })

    if (!homepage) {
      return NextResponse.json(
        { error: 'Homepage content not found. Please run seed script first.' },
        { status: 404 }
      )
    }

    const faq = await prisma.fAQ.create({
      data: {
        ...data,
        homePageContentId: homepage.id,
      },
    })

    return NextResponse.json(faq, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating FAQ:', error)
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    )
  }
}

