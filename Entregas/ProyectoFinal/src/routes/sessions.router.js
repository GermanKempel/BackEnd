import { Router } from 'express';
import passport from 'passport';
import Users from '../dao/dbManagers/users.dao.js';
import { createHash, authorization, generateToken, passportCall, isValidPassword } from '../utils.js';
import { resetPasswordNotification } from '../utils/custom-html.js';
import { sendMail } from '../services/mail.services.js';

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
        return res.send({ status: 'success', message: 'Login successful', token });
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
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: 'error', error: 'Logout fail' });
        res.redirect('/')
    })
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
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
        const token = generateToken(user);
        const expirationTime = Date.now() + 3600000;
        user.reset_token = token;
        user.reset_token_expiration = expirationTime;
        await usersManager.update(user);

        await sendMail({
            to: user.email,
            subject: 'Reset Password',
            html: resetPasswordNotification(user.first_name, token)
        });

        return res.send({ status: 'success', email: user.email, name: user.first_name, token });

    }
});

router.get('/reset-password', async (req, res) => {
    res.render('newPassForm');
});

router.post('/update-password', async (req, res) => {
    const { email, token, password } = req.body;
    const user = await usersManager.getByEmail(email);
    if (!user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
    if (user) {
        if (user.reset_token !== token) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
        if (user.reset_token_expiration < Date.now()) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
        const hashedPassword = createHash(password);
        user.password = hashedPassword;
        user.reset_token = null;
        user.reset_token_expiration = null;
        await usersManager.update(user);
        return res.send({ status: 'success', message: 'Password updated' });
    }
});

export default router;