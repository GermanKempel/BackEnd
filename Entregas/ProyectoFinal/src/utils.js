import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from '../src/config/config.js'
import { faker } from '@faker-js/faker'
import nodemailer from 'nodemailer'

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const userMail = config.userNodeMailer;
const passMail = config.passNodeMailer;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: userMail,
    pass: passMail
  }
})

export const generateRandomProducts = () => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    const product = {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.imageUrl(),
      stock: faker.datatype.number(),
      category: faker.commerce.department()
    }
    products.push(product);
  }
  return products;
}

const private_key = config.private_key;

export const generateToken = (user) => {
  const token = jwt.sign({ user }, private_key, { expiresIn: '24h' });
  return token;
};

export const authToken = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) return res.status(401).send({ error: 'Not authenticated' });

  const token = authToken.split(' ')[1];

  jwt.verify(token, private_key, (error, credentials) => {
    if (error) return res.status(403).send({ error: 'Not authorized' });
    req.user = credentials.user;
    next();
  })
}

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
      }
      req.user = user;
      next();
    })(req, res, next)
  }
}

export const authorization = (role) => {
  return async (req, res, next) => {
    if (req.user.role != role) return res.status(403).send({ error: 'Not permissions' });
    next();
  }
}

export const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect('/products');
  next();
}

export const privateAccess = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login');
  next();
}

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname