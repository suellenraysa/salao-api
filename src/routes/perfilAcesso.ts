import { Router } from 'express';
import PerfilAcessoController from '../controllers/perfilAcesso';

const clienteRouter = Router();
const perfilAcessoController = new PerfilAcessoController();

clienteRouter.get('/', perfilAcessoController.show);
clienteRouter.get('/:perfil_acesso_id', perfilAcessoController.findID);
clienteRouter.delete('/:perfil_acesso_id', perfilAcessoController.deletar);

export default clienteRouter;