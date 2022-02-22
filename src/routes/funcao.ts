import { Router } from 'express';
import FuncaoController from '../controllers/funcao';
import ValidatorCreateFuncao from '../validators/CreateFuncao'

const funcaoRouter = Router();
const funcaoController = new FuncaoController();

funcaoRouter.get('/', funcaoController.show);
funcaoRouter.get('/:funcao_id', funcaoController.findID);
funcaoRouter.delete('/:funcao_id', funcaoController.deletar);
funcaoRouter.post('/', ValidatorCreateFuncao, funcaoController.create);
funcaoRouter.put('/:funcao_id', ValidatorCreateFuncao, funcaoController.update);

export default funcaoRouter;
