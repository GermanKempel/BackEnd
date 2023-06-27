import { Router } from 'express';
import { authToken, authorization, generateToken, passportCall, isValidPassword, createHash } from '../utils.js';
import passport from 'passport';
import Users from '../dao/dbManagers/users.manager.js';



const router = Router();

const usersManager = new Users();


router.post('/register', async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;

  if (!first_name || !last_name || !age || !email || !password)
    return res.status(400).send({ status: 'error', error: 'faltan campos' });

  const exists = await usersManager.getByEmail(email);

  if (exists)
    return res.status(400).send({ status: 'error', error: 'Already exists' });

  const hashedPassword = createHash(password);

  const newUser = {
    ...req.body
  };

  newUser.password = hashedPassword;

  const result = await usersManager.save(newUser);

  res.send({ status: 'success', message: 'User registered' })

})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await usersManager.getByEmail(email);
  if (!user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });

  const comparePassword = isValidPassword(user, password);

  if (!comparePassword) {
    return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
  }

  const accessToken = generateToken(user)

  res.cookie('coderCookieToken', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

  res.send({ status: 'success', message: 'User logged in' });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send({ status: 'success', payload: req.user });
});

router.get('/current-custom', passportCall('jwt'), authorization('admin'), (req, res) => {
  res.send({ status: 'success', payload: req.user });
});

export default router;