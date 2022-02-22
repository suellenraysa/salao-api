import { Router } from 'express';
import ServicosController from '../controllers/servicos';
import ValidatorCreateServicos from '../validators/CreateServicos'

const servicosRouter = Router();
const servicosController = new ServicosController();

servicosRouter.get('/', servicosController.show);
servicosRouter.get('/:servicos_id', servicosController.findID);
servicosRouter.get('/nomeServico/:nome', servicosController.findPesquisa);
servicosRouter.delete('/:servicos_id', servicosController.deletar);
servicosRouter.post('/', ValidatorCreateServicos, servicosController.create);
servicosRouter.put('/:servicos_id', ValidatorCreateServicos, servicosController.update);

export default servicosRouter;