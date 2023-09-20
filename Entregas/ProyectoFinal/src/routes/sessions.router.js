import { Router } from 'express';
import { authorization, passportCall } from '../utils.js';
import { deleteUser } from '../controllers/users.controller.js';
import { sendMailTicket, logout, login, register, currentUser, resetPassword, resetPassToken, updatePassword, githubAuth, githubCallback } from '../controllers/sessions.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', passportCall('login'), login);
router.post('/logout', passportCall('jwt'), logout);
router.post('/reset-password', resetPassword);
router.post('/update-password', updatePassword);
router.post('/send-mail-ticket', passportCall('jwt'), sendMailTicket);
router.get('/github', passportCall('github', { scope: ['user:email'] }), githubAuth);
router.get('/github-callback', passportCall('github', { failureRedirect: '/login' }), githubCallback);
router.get('/current', passportCall('jwt'), currentUser);
router.get('/current-custom', passportCall('jwt'), authorization('admin'), currentUser);
router.get('/reset-password/:token', resetPassToken);
router.delete('/delete', passportCall('jwt'), deleteUser);


export default router;