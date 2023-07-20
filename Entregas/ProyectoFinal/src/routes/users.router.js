import { Router } from 'express';
import { saveUser, getAllUsers, getUserByEmail, getUserDTO } from '../controllers/users.controller.js';

const router = Router();

router.post('/', saveUser);
router.get('/', getAllUsers);
router.get('/:email', getUserByEmail);
router.get('/current', getUserDTO);

export default router;