import { Router } from 'express';
import { deleteUser, updateRole, getById, saveUser, getAllUsers, getByEmail, getUserDTO, update, updateToPremium } from '../controllers/users.controller.js';
import toAsyncRouter from 'async-express-decorator';
import upload from '../middlewares/uploader.js';
import passport from 'passport';
import { authorization } from '../utils.js';
import { deleteInactiveUser } from '../services/users.service.js';

const router = toAsyncRouter(Router());

router.post('/', saveUser);
router.get('/', getAllUsers);
router.get('/:email', getByEmail);
router.get('/current', passport.authenticate('jwt'), getUserDTO);
router.post('/premium/:uid', updateToPremium);
router.post('/:uid/documents', upload.array('documents'), update);
router.delete('/:uid', authorization('admin'), deleteUser);
router.delete('/:uid/inactive', authorization('admin'), deleteInactiveUser);
router.post('/:uid/role', authorization('admin'), updateRole);
router.get('/:uid', authorization('admin'), getById);

export default router;