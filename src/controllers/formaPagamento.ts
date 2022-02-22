import { Request, Response } from 'express';
import FormaPagamentoRepository from '../repositories/formaPagamento';

const formaPagamentoRepository = new FormaPagamentoRepository();

class FormaPagamentoController {
  public async show(request: Request, response: Response): Promise<Response> {
    try{
      const formaPagamento = await formaPagamentoRepository.show();
  
    return response.json(formaPagamento);
    } catch(err){
      return response.status(500).send(err);
    }
   
  }

  
  public async findID(request: Request, response: Response): Promise<Response> {
    const formaPagamento_id: number = Number(request.params.formaPagamento_id);
    const formaPagamento = await formaPagamentoRepository.findID(formaPagamento_id);
   
    return response.json(formaPagamento);
  }

  public async deletar(request: Request, response: Response): Promise<Response> {
    try{
      const formaPagamento_id: number = Number(request.params.forma_pagamento_id);
      await formaPagamentoRepository.deletar(formaPagamento_id);
    
      return response.send("Forma de pagamento excluído com sucesso!");
    } catch(err){
      return response.status(400).send("Forma de pagamento não pode ser exluído, possui pagamento efetuado");
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const forma_pagamento = request.body.forma_pagamento;
    
    await formaPagamentoRepository.create(forma_pagamento);
   
    return response.send("Forma de pagamento adicionado com sucesso!");
  }

  async update(request: Request, response: Response): Promise<Response> {
    const forma_pagamento_id: number = Number(request.params.forma_pagamento_id);
    const forma_pagamento = request.body.forma_pagamento;
    
    await formaPagamentoRepository.update(forma_pagamento_id, forma_pagamento);
   
    return response.send("Forma de pagamento atualizado com sucesso!");
  }

}

export default FormaPagamentoController;