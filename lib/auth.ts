import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export interface User {
  id: string
  email: string
  name: string
  role: string
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

/**
 * Authenticate user with email/phone and password
 */
export async function authenticateUser(
  emailOrPhone: string,
  password: string
): Promise<User | null> {
  // Try to find by email first, then by phone
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: emailOrPhone },
        { phone: emailOrPhone },
      ],
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      password: true,
    },
  })

  if (!user) {
    return null
  }

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    return null
  }

  // Remove password from return object
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin' ?? false
}

/**
 * Create a new user (for seeding)
 */
export async function createUser(
  email: string,
  name: string,
  password: string,
  role: string = 'admin'
): Promise<User> {
  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  })

  return user
}

