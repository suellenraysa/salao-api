import { Router } from 'express';
import FormaPagamentoController from '../controllers/formaPagamento';
import ValidatorCreateFormaPagamento from '../validators/CreateFormaPagamento';

const formaPagamentoRouter = Router();
const formaPagamentoController = new FormaPagamentoController();

formaPagamentoRouter.get('/', formaPagamentoController.show);
formaPagamentoRouter.get('/:forma_pagamento_id', formaPagamentoController.findID);
formaPagamentoRouter.delete('/:forma_pagamento_id', formaPagamentoController.deletar);
formaPagamentoRouter.post('/', ValidatorCreateFormaPagamento, formaPagamentoController.create);
formaPagamentoRouter.put('/:forma_pagamento_id', ValidatorCreateFormaPagamento, formaPagamentoController.update);

export default formaPagamentoRouter;