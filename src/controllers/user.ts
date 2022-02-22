import { Request, Response } from 'express';
import UsuarioRepository from '../repositories/user';

const usuarioRepository = new UsuarioRepository();

class UserController {
  async show(request: Request, response: Response): Promise<Response> {
    const usuarios = await usuarioRepository.show();
    return response.json(usuarios);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const usuarioEncontrado = await usuarioRepository.index(data.email);

    if (usuarioEncontrado)
      return response.status(400).json({ error: 'Email já cadastrado' });

    const usuario = await usuarioRepository.store(data);
    return response.json(usuario);
  }
}

export default UserController;
