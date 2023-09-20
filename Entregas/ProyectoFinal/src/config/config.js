import dotenv from 'dotenv';

dotenv.config();

export default {
  persistence: process.env.PERSISTENCE,
  mongoURL: process.env.MONGO_URL,
  port: process.env.PORT,
  private_key: process.env.PRIVATE_KEY,
  Github_clientID: process.env.GITHUB_CLIENT_ID,
  Github_clientSecret: process.env.GITHUB_CLIENT_SECRET,
  userNodeMailer: process.env.USER_NODE_MAILER,
  passNodeMailer: process.env.PASS_NODE_MAILER,
  ENVIRONMENT: process.env.NODE_ENV
};