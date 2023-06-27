import { Router } from 'express';
import passport from 'passport';


const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: 'fail_register' }), async (req, res) => {
    res.send({ status: 'success', message: 'User registered' });
});

router.get('/fail_register', async (req, res) => {
    res.send({ status: 'error', error: 'Register failed' });
});

router.post('/login', passport.authenticate('login', { failureRedirect: 'fail_login' }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
    }

    res.send({ status: 'success', message: 'User logged in' });
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

export default router;