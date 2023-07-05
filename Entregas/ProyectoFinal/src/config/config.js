import dotenv from 'dotenv';

dotenv.config();

export default {
  persistance: process.env.PERSISTANCE,
  mongoURL: process.env.MONGO_URL,
  port: process.env.PORT,
  private_key: process.env.PRIVATE_KEY,
  Github_clientID: process.env.GITHUB_CLIENT_ID,
  Github_clientSecret: process.env.GITHUB_CLIENT_SECRET,
};