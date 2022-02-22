import { Router } from 'express';
import ProfissionalController from '../controllers/profissional';
import ValidatorCreateProfissional from '../validators/CreateProfissional'
import ValidatorUpdateProfissional from '../validators/UpdateProfissional'

const profissionalRouter = Router();
const profissionalController = new ProfissionalController();

profissionalRouter.get('/', profissionalController.show);
profissionalRouter.get('/:profissional_id', profissionalController.findID);
profissionalRouter.delete('/:profissional_id', profissionalController.deletar);
profissionalRouter.post('/', ValidatorCreateProfissional, profissionalController.create);
profissionalRouter.put('/:profissional_id', ValidatorUpdateProfissional, profissionalController.update);

export default profissionalRouter;