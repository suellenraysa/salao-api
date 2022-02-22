import { Request, Response } from 'express';
import UsuarioRepository from '../repositories/usuario';
import { hash } from 'bcryptjs';

const usuarioRepository = new UsuarioRepository();

class UsuarioController {
  public async show(request: Request, response: Response): Promise<Response> {
   const usuarios = await usuarioRepository.show();
  
    return response.json(usuarios);
  }

  
  public async findID(request: Request, response: Response): Promise<Response> {
    const usuario_id: number = Number(request.params.usuario_id);
    const usuarios = await usuarioRepository.findID(usuario_id);
   
    return response.json(usuarios);
  }

  public async deletar(request: Request, response: Response): Promise<Response> {
    const usuario_id: number = Number(request.params.usuario_id);
    await usuarioRepository.deletar(usuario_id);
   
    return response.send("Usuário excluso com sucesso!");
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { login, senha } = request.body;

    const usuarioEncontrado = await usuarioRepository.findLogin(login);

    let msg: string[] = [];

    if (usuarioEncontrado)
      msg.push("Login não pode ser criado porque já existe.")
    
    if(msg.length) return response.status(401).json({ erro: msg })

    const newSenha = await hash(senha, 8);

    await usuarioRepository.create( 1, 1, login, newSenha );
   
    return response.send("Usuário adicionado com sucesso!");
    
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const usuario_id: number = Number(request.params.usuario_id);
    const { perfil_acesso_id , cliente_id , funcionario_id , profissional_id , login , senha } = request.body;
    
    await usuarioRepository.update( usuario_id, perfil_acesso_id , cliente_id , funcionario_id , profissional_id , login , senha );
   
    return response.send("Usuário atualizado com sucesso!");
  }

}

export default UsuarioController;