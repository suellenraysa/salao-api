import { Router } from 'express';
import LoginController from '../controllers/login';
import ValidatorCreateLogin from '../validators/CreateLogin'

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', ValidatorCreateLogin, loginController.login);

export default loginRouter;