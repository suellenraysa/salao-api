import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import UsuarioRepository from '../repositories/usuario';

const usuarioRepository = new UsuarioRepository();

class LoginController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { login, senha } = request.body;

    const usuario = await usuarioRepository.findLogin(login);

    if (!usuario) {
      return response.status(500).send('Usuário não encontrado');
    }

    if(!usuario.ativo) {
      return response.status(500).send('Usuário inativo');
     }

    const passwordMatched = await compare(senha, usuario.senha);

    if (!passwordMatched){
      return response.status(500).send('Senha incorreta!');
    }

    const token = sign(
      { 
        usuarioId: usuario.usuario_id, 
        clienteId: usuario.cliente_id, 
        profissionalId: usuario.profissional_id, 
        funcionarioId: usuario.funcionario_id,
        perfilAcessoId: usuario.perfil_acesso_id
      },
     "asd",
      {
        expiresIn: 1024,
      },
    );
  
    return response.json(token);
  }
}

export default LoginController;