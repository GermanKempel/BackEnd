import Router from './router.js';
import Users from '../dao/dbManagers/users.managers.js';
import { passportStrategiesEnum } from '../config/enums.config.js';
import { isValidPassword, generateToken, createHash } from '../utils.js';

const usersManager = new Users();

export default class UsersRouter extends Router {
  init() {
    this.post('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
      const { email, password } = req.body;
      const user = await usersManager.getByEmail(email);
      if (!user) return res.sendClientError('incorrect credentials');

      const comparePassword = isValidPassword(user, password);

      if (!comparePassword) {
        return res.sendClientError('incorrect credentials');
      }

      const accessToken = generateToken(user);
      res.sendSuccess({ accessToken });
    });

    this.get('/current', ['PRIVATE'], passportStrategiesEnum.JWT, async (req, res) => {
      const { user } = req;
      res.sendSuccess({ user });
    });

    this.get('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
      res.render('login');
    });

    this.get('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
      res.render('register');
    });

    this.get('/', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
      try {
        const users = await usersManager.getAll();
        res.render('users', { users })
      } catch (error) {
        console.log(error);
      }
    })



    this.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
      try {
        const { first_name, last_name, role, age, email, password } = req.body;

        if (!first_name || !last_name || !role || !age || !email || !password)
          return res.sendClientError('incomplete values')

        const exists = await usersManager.getByEmail(email);

        if (exists)
          return res.sendClientError('user already exists')

        const hashedPassword = createHash(password);

        const newUser = {
          ...req.body
        };

        newUser.password = hashedPassword;

        const result = await usersManager.save(newUser);

        res.sendSuccess(result)
      } catch (error) {
        res.sendServerError(error.message);
      }
    })
  }
}