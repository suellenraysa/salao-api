import { Router } from 'express';

import usuarioRouter from './usuario';
import perfilRouter from './perfil';
import loginRouter from './login';
import clienteRouter from './cliente';
import funcionarioRouter from './funcionario';
import profissionalRouter from './profissional';
import funcaoRouter from './funcao';
import servicosRouter from './servicos';
import formaPagamentoRouter from './formaPagamento';
import pagamentoRouter from './pagamento';
import agendamentoRouter from './agendamento';
import profissionalFuncaoRouter from './profissionalFuncao';
import relatorioRouter from './relatorio';

const routes = Router();

routes.use('/usuario', usuarioRouter);
routes.use('/perfis', perfilRouter);
routes.use('/login', loginRouter);
routes.use('/cliente', clienteRouter);
routes.use('/funcionario', funcionarioRouter);
routes.use('/profissional', profissionalRouter);
routes.use('/profissionalFuncao', profissionalFuncaoRouter);
routes.use('/funcao', funcaoRouter);
routes.use('/servicos', servicosRouter);
routes.use('/pagamento', pagamentoRouter);
routes.use('/formaPagamento', formaPagamentoRouter);
routes.use('/agendamento', agendamentoRouter);
routes.use('/relatorio', relatorioRouter);


export default routes;