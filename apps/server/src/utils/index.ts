import crypto from 'node:crypto'

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

export function generateSalt() {
  return crypto.randomBytes(128).toString('base64')
}
