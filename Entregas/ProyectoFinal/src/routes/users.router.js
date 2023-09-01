import { Router } from 'express';
import { saveUser, getAllUsers, getUserByEmail, getUserDTO, update, updateToPremium } from '../controllers/users.controller.js';
import toAsyncRouter from 'async-express-decorator';
import upload from '../middlewares/uploader.js';
import passport from 'passport';

const router = toAsyncRouter(Router());

router.post('/', saveUser);
router.get('/', getAllUsers);
router.get('/:email', getUserByEmail);
router.get('/current', passport.authenticate('jwt'), getUserDTO);
router.post('/premium/:uid', updateToPremium);
router.post('/:uid/documents', upload.array('documents'), update);

export default router;