import passport from 'passport';
import local from 'passport-local';
import { createHash, isValidPassword } from '../utils.js';
import GitHubStrategy from 'passport-github2';
import jwt from 'passport-jwt';
import Users from '../dao/dbManagers/users.dao.js';
import config from './config.js'

const usersManager = new Users();

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const LocalStrategy = local.Strategy;

const private_key = config.private_key;
const Github_clientID = config.Github_clientID;
const Github_clientSecret = config.Github_clientSecret;

const initializePassport = () => {

  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: private_key
  }, async (payload, done) => {
    try {
      return done(null, payload.user);
    } catch (error) {
      done(error, false);
    }
  }));

  passport.use('register', new LocalStrategy({
    passReqToCallback: true, //permite acceder al objeto request como cualquier otro middleware,
    usernameField: 'email'
  }, async (req, username, password, done) => {

    const { first_name, last_name, age } = req.body;

    if (!first_name || !last_name || !age || !username || !password)
      return done(null, false, { message: 'Missing fields' });

    const user = await usersManager.getByEmail(username);

    if (user) return done(null, false, { message: 'User already exists' });

    const hash = createHash(password);

    const newUser = {
      ...req.body,
    };

    newUser.password = hash;

    const createdUser = await usersManager.save(newUser);

    return done(null, createdUser);

  }));

  passport.use('login', new LocalStrategy({
    usernameField: 'email'
  }, async (username, password, done) => {
    try {
      const user = await usersManager.getByEmail(username);

      if (!user) {
        return done(null, false, { message: 'Invalid credentials' });
      }

      if (!isValidPassword(user, password)) return done(null, false, { message: 'Invalid credentials' });

      return done(null, user);

    } catch (error) {
      return done(`Error al obtener el usario: ${error}`)
    }
  }));

  passport.use('github', new GitHubStrategy({

    clientID: Github_clientID,
    clientSecret: Github_clientSecret,
    callbackURL: 'http://localhost:8080/api/sessions/github-callback',
    scope: ['user:email']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const user = await usersManager.getByEmail(email);
      if (!user) {
        const newUser = {
          first_name: profile._json.name,
          last_name: '',
          email,
          age: 18,
          password: ''
        };
        const createdUser = await usersManager.save(newUser);
        return done(null, createdUser);
      } else {
        return done(null, user);
      }
    } catch (error) {
      console.log(error);
      return done('Error al obtener el usuario: ${error}');
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    const user = await usersManager.getById(_id);
    done(null, user);
  });
};

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['coderCookie'];
  }
  return token;
}

export default initializePassport;