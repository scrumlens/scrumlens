import crypto from 'node:crypto'
import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'

export function hashPassword(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 1, 128, 'sha1').toString('hex')
}

export function checkPassword(
  password: string,
  passwordHash: string,
  salt: string,
) {
  return (
    crypto.pbkdf2Sync(password, salt, 1, 128, 'sha1').toString('hex')
    === passwordHash
  )
}

export function generateGuestEmail() {
  return `${nanoid(12)}@scrumlens.com`
}

export function generateSalt() {
  return crypto.randomBytes(128).toString('base64')
}

export function generateAccessTokens(userId: string) {
  const accessToken = jwt.sign(
    {
      userId,
    },
    Bun.env.SECRET_KEY,
    { expiresIn: '15m' },
  )

  const refreshToken = jwt.sign(
    {
      userId,
    },
    Bun.env.SECRET_KEY,
    { expiresIn: '7d' },
  )

  return { accessToken, refreshToken }
}

export function generateVerifyToken(userId: string) {
  return jwt.sign(
    {
      userId,
    },
    Bun.env.SECRET_KEY,
    { expiresIn: '5d' },
  )
}

export function verifyToken(token: string) {
  return jwt.verify(token, Bun.env.SECRET_KEY) as JwtPayload
}
