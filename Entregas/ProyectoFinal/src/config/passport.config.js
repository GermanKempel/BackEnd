import passport from 'passport';
import local from 'passport-local';
import userModel from '../dao/models/users.models.js';
import { createHash, isValidPassword } from '../utils.js';
import GitHubStrategy from 'passport-github2';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use('register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
  }, async (req, username, password, done) => {
    const { first_name, last_name, email, age } = req.body;
    try {
      const user = await userModel.findOne({ email: username });
      if (user) return done(null, false);
      const newUser = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
      };
      const createdUser = await userModel.create(newUser);
      return done(null, createdUser);
    } catch (error) {
      return done('Error al obtener el usuario: ${error}');
    }
  }));

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
  }, async (username, password, done) => {
    try {
      const user = await userModel.findOne({ email: username });
      if (email === 'adminCoder@coder.com' && password === 'admincod3r123') {
        req.session.user.role = {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          age: user.age,
          role: 'admin'
        }
      }
      if (!user) return done(null, false);
      if (!isValidPassword(password, user.password)) return done(null, false);
      delete user.password;
      return done(null, user);
    } catch (error) {
      return done('Error al obtener el usuario: ${error}');
    }
  }));

  passport.use(new GitHubStrategy({
    clientID: 'la quite por seguridad',
    clientSecret: 'la quite por seguridad',
    callbackURL: 'http://localhost:8080/api/sessions/github-callback',
    scope: ['user:email']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const user = await userModel.findOne({ email });
      if (!user) {
        const newUser = {
          first_name: profile._json.name,
          last_name: '',
          email,
          age: 18,
          password: ''
        };
        const createdUser = await userModel.create(newUser);
        return done(null, createdUser);
      }
      return done(null, user);
    } catch (error) {
      return done('Error al obtener el usuario: ${error}');
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    const user = await userModel.findById(_id);
    done(null, user);
  });
};

export default initializePassport;