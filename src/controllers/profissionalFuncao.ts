import { Request, Response } from 'express';
import ProfissionalFuncaoRepository from '../repositories/profissionalFuncao';

const profissionalFuncaoRepository = new ProfissionalFuncaoRepository();

class ProfissionalFuncaoController {
  public async show(request: Request, response: Response): Promise<Response> {
   const profissionalFuncao = await profissionalFuncaoRepository.show();
  
    return response.json(profissionalFuncao);
  }

  public async findFuncao(request: Request, response: Response): Promise<Response> {
    const funcao_id: number = Number(request.params.funcao_id);
    const profissionalFuncao = await profissionalFuncaoRepository.findFuncao(funcao_id);
   console.log(profissionalFuncao)
    return response.json(profissionalFuncao);
   }
  public async findProfissional(request: Request, response: Response): Promise<Response> {
    const profissional_id: number = Number(request.params.profissional_id);
    const profissionalFuncao = await profissionalFuncaoRepository.findProfissional(profissional_id);
   
     return response.json(profissionalFuncao);
   }

   public async deletar(request: Request, response: Response): Promise<Response> {
    const funcao_id: number = Number(request.params.funcao_id);
    const profissional_id: number = Number(request.params.profissional_id);
    await profissionalFuncaoRepository.deletar(funcao_id, profissional_id);
   
    return response.send("Função para profissional excluída com sucesso!");
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const funcao_id: number = Number(request.body.funcao_id);
    const profissional_id: number = Number(request.body.profissional_id);

    const profissionalFuncao = await profissionalFuncaoRepository.findProfissionalFuncao(profissional_id, funcao_id);
    
    if (profissionalFuncao){
      return response.status(400).json({ message: "Função para profissional já existe!" });
    }

    await profissionalFuncaoRepository.create(funcao_id, profissional_id);
   
    return response.send("Função para profissional adicionada com sucesso!");
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const funcao_id: number = Number(request.body.funcao_id);
    const profissional_id: number = Number(request.body.profissional_id);

    const funcao_idOld: number = Number(request.params.funcao_id);
    const profissional_idOld: number = Number(request.params.profissional_id);

    const profissionalFuncao = await profissionalFuncaoRepository.findProfissionalFuncao(profissional_id, funcao_id);
    
    if (profissionalFuncao){
      return response.status(400).json({ message: "Função para profissional já existe!" });
    }
    
    await profissionalFuncaoRepository.update(funcao_id, profissional_id, funcao_idOld, profissional_idOld);
   
    return response.send("Função para profissional atualizada com sucesso!");
  }


}

export default ProfissionalFuncaoController;
