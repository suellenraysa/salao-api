import { Router } from 'express';
import AgendamentoController from '../controllers/agendamento';
import ValidatorCreateAgendamento from '../validators/CreateAgendamento';

const agendamentoRouter = Router();
const agendamentoController = new AgendamentoController();

agendamentoRouter.get('/:cliente_id', agendamentoController.show);
agendamentoRouter.get('/iniciarAtendimento/:agendamento_id', agendamentoController.iniciarAtendimento);
agendamentoRouter.get('/encerrarAtendimento/:agendamento_id', agendamentoController.encerrarAtendimento);
agendamentoRouter.get('/getAgendamentoCliente/:cliente_id/:data_atendimento', agendamentoController.getAgendamentoDataCliente);
agendamentoRouter.get('/getJaFezAgendamentos/:cliente_id', agendamentoController.getJaFezAgendamentos);
agendamentoRouter.get('/getAgendamentoProfissional/:profissional_id/:data_atendimento', agendamentoController.getAgendamentoProfissional);
agendamentoRouter.get('/getAgendamentoData/:data_atendimento', agendamentoController.getAgendamentoData);
agendamentoRouter.delete('/:agendamento_id', agendamentoController.deletar);
agendamentoRouter.post('/', ValidatorCreateAgendamento, agendamentoController.create);
agendamentoRouter.put('/:agendamento_id', ValidatorCreateAgendamento, agendamentoController.update);

export default agendamentoRouter;