import { Router } from 'express';
import { saveUser, getAllUsers, getUserByEmail, getUserDTO } from '../controllers/users.controller.js';
import toAsyncRouter from 'async-express-decorator'

const router = toAsyncRouter(Router());

router.post('/', saveUser);
router.get('/', getAllUsers);
router.get('/:email', getUserByEmail);
router.get('/current', getUserDTO);

export default router;