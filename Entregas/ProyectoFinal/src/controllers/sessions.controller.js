import * as usersService from "../services/users.service.js";
import * as cartsService from "../services/carts.services.js";
import logger from '../utils/loggers.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { resetPasswordNotification } from '../utils/custom-html.js';
import { sendMail } from '../services/mail.services.js';

const PRIVATE_KEY = config.private_key;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'error', error: 'Missing fields' });
    }

    const { token, user } = await usersService.loginUser(email, password);

    if (!user) {
      return res.status(401).json({ status: 'error', error: 'Invalid credentials' });
    }

    res.set('Authorization', `Bearer ${token}`);
    res.cookie('coderCookie', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
    req.session.user = req.user;

    return res.status(200).json({ status: 'success', message: 'Login successful', token });
  } catch (error) {
    logger.info('Error trying to login user', error);
    res.status(500).send({ status: 'error', error: error.message });
  }
};


const register = async (req, res) => {
  const { email, password, first_name, last_name, age } = req.body;

  if (!email || !password || !first_name || !last_name || !age) {
    return res.status(400).send({ status: 'error', error: 'Missing fields' });
  }

  try {
    const user = await usersService.registerUser({ email, password, first_name, last_name, age });
    res.send({ status: 'success', user });
  } catch (error) {
    logger.info('Error trying to register user', error);
    res.status(500).send({ status: 'error', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await usersService.getByEmail(email);

  if (!user) {
    return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
  }

  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '1h' });
  await usersService.update(user);

  const resetLink = `http://localhost:8080/api/sessions/reset-password/${token}`;
  const emailContent = resetPasswordNotification(resetLink);

  try {
    await sendMail({
      to: user.email,
      subject: 'Reset Password',
      html: emailContent,
    });

    return res.send({ status: 'success', message: 'Email sent', token });
  } catch (error) {
    logger.info('Error trying to send email', error);
    return res.status(500).send({ status: 'error', error: error.message });
  }
};

const resetPassToken = async (req, res) => {
  const { token } = req.params;

  try {
    jwt.verify(token, PRIVATE_KEY);
    const decodedToken = jwt.decode(token);
    const user = await usersService.getById(decodedToken.user._id);

    if (!user) {
      return res.status(400).send({ status: 'error', error: 'User not found' });
    }

    return res.render('newPass');
  } catch (error) {
    logger.info('Error trying to reset password', error);
    res.send({ status: 'error', error: 'Password not updated' });
    return res.redirect('/reset-pass');
  }
};

const updatePassword = async (req, res) => {
  const { password, token } = req.body;

  try {
    jwt.verify(token, PRIVATE_KEY);
    const decodedToken = jwt.decode(token);
    const user = await usersService.getById(decodedToken.user._id);

    if (!user) {
      return res.status(400).send({ status: 'error', error: 'User not found' });
    }

    const hashedPassword = createHash(password);
    user.password = hashedPassword;
    await usersService.update(user);

    return res.send({ status: 'success', message: 'Password updated' });
  } catch (error) {
    logger.info('Error trying to update password', error);
    res.send({ status: 'error', error: 'Password not updated' });
    return res.redirect('/reset-pass');
  }
};

const githubAuth = async (req, res) => {
  try {
    res.send({ status: 'success', message: 'User registered' });
  } catch (error) {
    logger.info('Error trying to register user', error);
    res.status(500).send({ status: 'error', error: 'User not registered' });
  }
};

const githubCallback = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);

    if (!user.cart) {
      const cart = {
        userId: user._id,
        timestamp: new Date(),
        products: [],
      };
      const createdCart = await cartsService.saveCart(cart);
      user.cart = createdCart._id;

      const { _id, ...updatedUser } = user;
      await usersService.update(_id, updatedUser);
    }
    req.session.user = req.user;
    res.redirect('/products');
  } catch (error) {
    logger.info('Error trying to register user', error);
    res.status(500).send({ status: 'error', error: 'User not registered' });
    res.redirect('/login');
  }
};


const currentUser = async (req, res) => {
  try {
    const user = req.user;
    res.send({ status: "success", user });
  } catch (error) {
    logger.info('Error trying to get current user', error);
    res.status(500).send({ status: "error", message: error.message });
  }

};

const logout = async (req, res) => {
  try {
    const user = req.user
    console.log(user);

    user.last_connection = new Date();
    await usersService.update(user._id, user);

    req.session.destroy()
    res.clearCookie('coderCookie');
    delete req.user

    res.send({ status: 'success', message: 'User logged out' });
  } catch (error) {
    logger.info('Error trying to logout user', error);
    res.status(500).send({ status: 'error', error: 'User not logged out' });
  }
};

const sendMailTicket = async (req, res) => {
  try {
    const user = req.user

    const ticketData = req.body.ticket;

    let htmlContent = '<p>Your ticket information:</p>';

    const propertiesToInclude = ['code', 'purchase_datetime', 'totalPrice'];

    for (const property of propertiesToInclude) {
      if (ticketData.hasOwnProperty(property)) {
        htmlContent += `<p>${property}: ${ticketData[property]}</p>`;
      }
    }
    await sendMail({
      to: user.email,
      subject: 'Ticket',
      html: htmlContent
    });

    res.send({ status: 'success', message: 'Email sent' });
  } catch (error) {
    logger.info('Error trying to send email', error);
    res.status(500).send({ status: 'error', error: error.message });
  }

}

export {
  sendMailTicket,
  register,
  login,
  resetPassword,
  resetPassToken,
  updatePassword,
  githubAuth,
  githubCallback,
  currentUser,
  logout
}