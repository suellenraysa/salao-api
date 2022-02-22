 import { Request, Response } from 'express';
import ServicosRepository from '../repositories/servicos';

const servicosRepository = new ServicosRepository();

class ServicosController {
  public async show(request: Request, response: Response): Promise<Response> {
   const servicos = await servicosRepository.show();
  
    return response.json(servicos);
  }

  
  public async findID(request: Request, response: Response): Promise<Response> {
    const servicos_id: number = Number(request.params.servicos_id);
    const servicos = await servicosRepository.findID(servicos_id);
   
    return response.json(servicos);
  }

  public async findPesquisa(request: Request, response: Response): Promise<Response> {
    const nome: string = String (request.params.nome);
    const servicos = await servicosRepository.findPesquisa(nome);
   
    return response.json(servicos);
  }

  public async deletar(request: Request, response: Response): Promise<Response> {
    const servicos_id: number = Number(request.params.servicos_id);
    try{
      await servicosRepository.deletar(servicos_id);
      return response.send("Serviços excluído com sucesso!");
    } catch(e){
      return response.status(400).send('Erro ao excluir serviço!');
    }
    
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, valor, comissao, tempo_servico, funcao_id } = request.body;

    const servicosEncontrado = await servicosRepository.findNome(nome);

    let msg: string[] = [];

    if (servicosEncontrado)
      msg.push("Serviço não pode ser cadastrado porque já existe serviço com este nome.")
    
    if(msg.length) return response.status(401).json({ erro: msg })

    await servicosRepository.create( nome, valor, comissao, tempo_servico, funcao_id);
   
    return response.send("Serviço adicionado com sucesso!");
    
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const servicos_id: number = Number(request.params.servicos_id);
    const { funcao_id, nome, valor, comissao, tempo_servico} = request.body;
    
    await servicosRepository.update(servicos_id, funcao_id,  nome, valor, comissao, tempo_servico);
   
    return response.send("Serviço atualizado com sucesso!");
  }

}

export default ServicosController;



