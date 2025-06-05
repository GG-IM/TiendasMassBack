import { Router } from 'express';
import { getAllUsuarios, register, login } from '../controllers/usuarios.controller';

const router = Router();

router.get('/', getAllUsuarios);
router.post('/register', register);
router.post('/login', login);

export default router;
