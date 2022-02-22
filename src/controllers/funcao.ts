import { Request, Response } from 'express';
import FuncaoRepository from '../repositories/funcao';

const funcaoRepository = new FuncaoRepository();

class FuncaoController {
  public async show(request: Request, response: Response): Promise<Response> {
   const funcoes = await funcaoRepository.show();
  
    return response.json(funcoes);
  }

  public async findID(request: Request, response: Response): Promise<Response> {
    const funcao_id: number = Number(request.params.funcao_id);
    const funcao = await funcaoRepository.findID(funcao_id);
   
     return response.json(funcao);
   }

   public async deletar(request: Request, response: Response): Promise<Response> {
    const funcao_id: number = Number(request.params.funcao_id);
    await funcaoRepository.deletar(funcao_id);
   
    return response.send("Cliente excluído com sucesso!");
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const nome_funcao = request.body.nome_funcao;
    
    await funcaoRepository.create(nome_funcao);
   
    return response.send("função adicionada com sucesso!");
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const funcao_id: number = Number(request.params.funcao_id);
    const nome_funcao = request.body.nome_funcao;
    
    await funcaoRepository.update(funcao_id, nome_funcao);
   
    return response.send("função atualizada com sucesso!");
  }


}

export default FuncaoController;