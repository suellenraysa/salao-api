import { Request, Response } from 'express';
import PerfilAcessoRepository from '../repositories/perfilAcesso';

const perfilAcessoRepository = new PerfilAcessoRepository();

class PerfilAcessoController {
  public async show(request: Request, response: Response): Promise<Response> {
   const perfilAcesso = await perfilAcessoRepository.show();
  
    return response.json(perfilAcesso);
  }

  
  public async findID(request: Request, response: Response): Promise<Response> {
    const perfil_acesso_id: number = Number(request.params.perfil_acesso_id);
    const perfilAcesso = await perfilAcessoRepository.findID(perfil_acesso_id);
   
    return response.json(perfilAcesso);
  }

  public async deletar(request: Request, response: Response): Promise<Response> {
    const perfil_acesso_id: number = Number(request.params.cliente_id);
    await perfilAcessoRepository.deletar(perfil_acesso_id);
   
    return response.send("Perfil de acesso excluído com sucesso!");
  }

}

export default PerfilAcessoController;