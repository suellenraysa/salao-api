import { Router } from 'express';
import FuncionarioController from '../controllers/funcionario';
import ValidatorCreateFuncionario from '../validators/CreateFuncionario'
import ValidatorUpdateFuncionario from '../validators/UpdateFuncionario'

const funcionarioRouter = Router();

const funcionarioController = new FuncionarioController();

funcionarioRouter.get('/', funcionarioController.show);
funcionarioRouter.get('/:funcionario_id', funcionarioController.findID);
funcionarioRouter.delete('/:funcionario_id', funcionarioController.deletar);
funcionarioRouter.post('/', ValidatorCreateFuncionario, funcionarioController.create);
funcionarioRouter.put('/:funcionario_id', ValidatorUpdateFuncionario, funcionarioController.update);

export default funcionarioRouter;