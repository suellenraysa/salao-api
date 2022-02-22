import { Request, Response } from 'express';
import { hash } from 'bcryptjs';

import ClienteRepository from '../repositories/cliente';
import UsuarioRepository from '../repositories/usuario';

const clienteRepository = new ClienteRepository();
const usuarioRepository = new UsuarioRepository();

class ClienteController {
  public async show(request: Request, response: Response): Promise<Response> {
   const clientes = await clienteRepository.show();
  
    return response.json(clientes);
  }

  public async findID(request: Request, response: Response): Promise<Response> {
    const cliente_id: number = Number(request.params.cliente_id);
    const clientes = await clienteRepository.findID(cliente_id);
   
    return response.json(clientes);
  }

  public async findNome(request: Request, response: Response): Promise<Response> {
    const nome: string = String(request.params.nome);
    const clientes = await clienteRepository.findNome(nome)

    return response.json(clientes)
  }

  public async deletar(request: Request, response: Response): Promise<Response> {
    const cliente_id: number = Number(request.params.cliente_id);
    await clienteRepository.deletar(cliente_id);
   
    return response.send("Cliente excluído com sucesso!");
  }

  public async desativar(request: Request, response: Response): Promise<Response> {
    const cliente_id: number = Number(request.params.cliente_id);
    await usuarioRepository.desativar(cliente_id);
   
    return response.send("Cliente desativado com sucesso!");
  }

  public async ativar(request: Request, response: Response): Promise<Response> {
    const cliente_id: number = Number(request.params.cliente_id);
    await usuarioRepository.ativar(cliente_id);
   
    return response.send("Cliente ativado com sucesso!");
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, cpf, data_nasc, sexo, telefone, email, senha } = request.body;

    const clienteEncontrado = await clienteRepository.findEmail(email);

    let msg: string[] = [];

    if (clienteEncontrado)
      msg.push("O cliente já possui cadastro no Sistema.")
    
    const cpfEncontrado = await clienteRepository.findCpf(cpf);

    if (cpfEncontrado)
      msg.push("cadastro não pode ser realizado porque o CPF já existe.")
    

    if(msg.length) return response.status(401).json({ erro: msg })

    const retorno = await clienteRepository.create(nome, cpf, data_nasc, sexo, telefone, email);
    const cliente_id = retorno[0];

    const newSenha = await hash(senha, 8);

    await usuarioRepository.create(1, cliente_id, email, newSenha); 
   
    return response.send("Cliente adicionado com sucesso!");
    
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const cliente_id: number = Number(request.params.cliente_id);
    const { nome, data_nasc, sexo, telefone, email, senha } = request.body;
    
    await clienteRepository.update(cliente_id, nome, data_nasc, sexo, telefone, email);

    let newSenha;
    
    if(senha){
      newSenha = await hash(senha, 8);
    }
    
    await usuarioRepository.updateCliente(cliente_id, email, newSenha);
   
    return response.send("Cliente atualizada com sucesso!");
  }

}

export default ClienteController;