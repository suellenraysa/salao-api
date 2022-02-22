import { Router } from 'express';
import RelatorioController from '../controllers/relatorio';

const relatorioRouter = Router();
const relatorioController = new RelatorioController();

relatorioRouter.get('/comissao', relatorioController.relatorioComissao);
relatorioRouter.get('/servico/:profissional_id/:servicos_id/:dataFrom/:dataTo', relatorioController.relatorioServico);
relatorioRouter.post('/servico', relatorioController.relatorioServico);

export default relatorioRouter;