import { Router } from 'express';
import PagamentoController from '../controllers/pagamento';
import ValidatorCreatePagamento from '../validators/CreatePagamento'

const pagamentoRouter = Router();
const pagamentoController = new PagamentoController();

pagamentoRouter.get('/', pagamentoController.show);
pagamentoRouter.get('/:pagamento_id', pagamentoController.findID);
pagamentoRouter.delete('/:pagamento_id', pagamentoController.deletar);
pagamentoRouter.post('/', ValidatorCreatePagamento, pagamentoController.create);
pagamentoRouter.put('/:pagamento_id', ValidatorCreatePagamento, pagamentoController.update);

export default pagamentoRouter;