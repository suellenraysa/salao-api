import { Router } from 'express';
import UsuarioController from '../controllers/usuario';
import ValidatorCreateUsuario from '../validators/CreateUsuario'

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.get('/', usuarioController.show);
usuarioRouter.get('/:usuario_id', usuarioController.findID);
usuarioRouter.delete('/:usuario_id', usuarioController.deletar);
usuarioRouter.post('/', ValidatorCreateUsuario, usuarioController.create);
usuarioRouter.put('/:usuario_id', ValidatorCreateUsuario, usuarioController.update);

export default usuarioRouter;