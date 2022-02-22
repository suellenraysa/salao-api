import { Router } from 'express';
import PerfilController from '../controllers/perfil';

const userRouter = Router();
const perfilController = new PerfilController();

userRouter.get('/', perfilController.show);

export default userRouter;
