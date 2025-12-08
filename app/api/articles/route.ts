import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const articleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().optional(),
  categoryId: z.string().optional(),
  author: z.string().optional(),
  image: z.string().optional(),
  publishedAt: z.string().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  featured: z.boolean().optional().default(false),
  readTime: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const articles = await prisma.article.findMany({
      where: {
        ...(status ? { status: status as 'draft' | 'published' } : {}),
        ...(category ? { categoryId: category } : {}),
        ...(featured === 'true' ? { featured: true } : {}),
      },
      include: {
        category: true,
      },
      orderBy: { publishedAt: 'desc' },
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = articleSchema.parse(body)

    const article = await prisma.article.create({
      data: {
        ...data,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}

