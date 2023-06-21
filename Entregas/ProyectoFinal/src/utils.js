import path from 'path'
import { fileURLToPath } from 'url'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const generateToken = (user) => {
  jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
  return token
}

export {
  __filename,
  __dirname,
  createHash,
  isValidPassword,
  generateToken
}
