import { Router } from 'express';
import { getAllUsuarios, register, login,update,getUsuarioById } from '../controllers/usuarios.controller';

const router = Router();

router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById); // Assuming this is for getting a user by ID
router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', update);

export default router;
