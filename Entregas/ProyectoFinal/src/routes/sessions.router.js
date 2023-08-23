import { Router } from 'express';
import passport from 'passport';
import Users from '../dao/dbManagers/users.dao.js';
import { createHash, authorization, authToken, generateToken, passportCall, isValidPassword } from '../utils.js';
import { resetPasswordNotification } from '../utils/custom-html.js';
import { sendMail } from '../services/mail.services.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const PRIVATE_KEY = config.private_key;
const usersManager = new Users();

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: 'fail_register' }), async (req, res) => {
    res.send({ status: 'success', message: 'User registered' });
});

router.get('/fail_register', async (req, res) => {
    res.send({ status: 'error', error: 'Register failed' });
});

router.post('/login', passport.authenticate('login', { failureRedirect: 'fail_login' }), async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).send({ status: 'error', error: 'faltan campos' });

    const user = await usersManager.getByEmail(email);

    if (!user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });

    if (user) {
        if (!isValidPassword(user, password)) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
        const token = generateToken(user);

        res.header('Authorization', `Bearer ${token}`);

        return res.status(200).send({ status: 'success', message: 'Login successful' });
    }
});

router.get('/fail_login', async (req, res) => {
    res.send({ status: 'error', error: 'Login failed' });
});

router.get('/github', passport.authenticate(
    'github', { scope: ['user:email'] }
), async (req, res) => {
    res.send({ status: "success", message: "User registered" })
});

router.get('/github-callback', passport.authenticate(
    'github', { failureRedirect: '/login' }
), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/')
});

router.get('/logout', (req, res) => {
    req.session.destroy
    res.clearCookie('coderCookie').send({ status: 'success', message: 'Logout successful' });
});

router.get('/current', passport.authenticate('jwt'), (req, res) => {
    res.send({ status: 'success', payload: req.user });
});

router.get('/current-custom', passportCall('jwt'), authorization('admin'), (req, res) => {
    res.send({ status: 'success', payload: req.user });
});

router.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    const user = await usersManager.getByEmail(email);
    if (!user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
    if (user) {
        const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '1h' });
        await usersManager.update(user);

        const resetLink = `http://localhost:8080/api/sessions/reset-password/${token}`;

        const emailContent = resetPasswordNotification(resetLink)

        await sendMail({
            to: user.email,
            subject: 'Reset Password',
            html: emailContent
        });

        return res.send({ status: 'success', message: 'Email sent', token });

    }
});


router.get('/reset-password/:token', async (req, res) => {
    const { token } = req.params;

    try {
        jwt.verify(token, PRIVATE_KEY);
        const decodedToken = jwt.decode(token);
        const user = await usersManager.getById(decodedToken.user._id);

        if (!user) {
            return res.status(400).send({ status: 'error', error: 'User not found' });
        }

        return res.render('newPass');
    } catch (error) {
        return res.redirect('/reset-pass');
    }
});

router.post('/update-password', async (req, res) => {

    const { password, token } = req.body;

    try {
        jwt.verify(token, PRIVATE_KEY);
        const decodedToken = jwt.decode(token);
        const user = await usersManager.getById(decodedToken.user._id);

        if (!user) {
            return res.status(400).send({ status: 'error', error: 'User not found' });
        }

        const hashedPassword = createHash(password);

        user.password = hashedPassword;

        await usersManager.update(user);

        return res.send({ status: 'success', message: 'Password updated' });

    } catch (error) {
        return res.redirect('/reset-pass');
    }

});

export default router;