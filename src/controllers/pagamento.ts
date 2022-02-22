import { Request, Response } from 'express';
import PagamentoRepository from '../repositories/pagamento';

const pagamentoRepository = new PagamentoRepository();

class PagamentoController {
  public async show(request: Request, response: Response): Promise<Response> {
   const pagamentos = await pagamentoRepository.show();
  
    return response.json(pagamentos);
  }

  
  public async findID(request: Request, response: Response): Promise<Response> {
    const pagamento_id: number = Number(request.params.pagamento_id);
    const pagamentos = await pagamentoRepository.findID(pagamento_id);
   
    return response.json(pagamentos);
  }

  public async deletar(request: Request, response: Response): Promise<Response> {
    const pagamento_id: number = Number(request.params.pagamento_id);
    await pagamentoRepository.deletar(pagamento_id);
   
    return response.send("Pagamento excluído com sucesso!");
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {forma_pagamento_id, atendimentos } = request.body;
    
    if (atendimentos.length){
      atendimentos.forEach(async (atendimento: any) => {
        await pagamentoRepository.create(atendimento.agendamento_id, forma_pagamento_id, atendimento.valor);
      });
      return response.send("Pagamento adicionado com sucesso!");
    } else {
      return response.send("Nenhum atendimento a ser pago!");
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const pagamento_id: number = Number(request.params.pagamento_id);
    const {agendamento_id, forma_pagamento_id, total, autorizado} = request.body;
    
    await pagamentoRepository.update(pagamento_id, agendamento_id, forma_pagamento_id, total, autorizado);
   
    return response.send("Pagamento atualizado com sucesso!");
  }
}

export default PagamentoController;

