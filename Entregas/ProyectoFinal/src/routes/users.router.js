import { Router } from 'express';
import { saveUser, getAllUsers, getUserByEmail } from '../controllers/users.controller.js';

const router = Router();

router.post('/', saveUser);
router.get('/', getAllUsers);
router.get('/:email', getUserByEmail);

export default router;