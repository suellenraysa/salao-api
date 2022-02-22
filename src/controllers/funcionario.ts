import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import FuncionarioRepository from '../repositories/funcionario';
import UsuarioRepository from '../repositories/usuario';

const funcionarioRepository = new FuncionarioRepository();
const usuarioRepository = new UsuarioRepository();

class FuncionarioController {
  public async show(request: Request, response: Response): Promise<Response> {
   const funcionarios = await funcionarioRepository.show();
  
    return response.json(funcionarios);
  }

  public async findID(request: Request, response: Response): Promise<Response> {
    const funcionario_id: number = Number(request.params.funcionario_id);
    const funcao = await funcionarioRepository.findID(funcionario_id);
   
     return response.json(funcao);
   }

   public async deletar(request: Request, response: Response): Promise<Response> {
    const funcionario_id: number = Number(request.params.funcionario_id);
    await funcionarioRepository.deletar(funcionario_id);
   
    return response.send("Funcionário excluído com sucesso!");
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { cargo, nome, cpf, data_nasc, telefone, email, senha, perfil_id } = request.body;

    const funcionarioEncontrado = await funcionarioRepository.findEmail(email);

    let msg: string[] = [];

    if (funcionarioEncontrado)
      msg.push("O cadastro não pode ser realizado porque o email já existe.")
    
    const cpfEncontrado = await funcionarioRepository.findCpf(cpf);

    if (cpfEncontrado)
      msg.push("O cadastro não pode ser realizado porque o CPF já existe.")
    

    if(msg.length) return response.status(401).json({ erro: msg })

    const retorno = await funcionarioRepository.create(cargo, nome, cpf, data_nasc, telefone, email);
    const funcionario_id = retorno[0];

    const newSenha = await hash(senha, 8);

    await usuarioRepository.createFunc(perfil_id, funcionario_id, email, newSenha); 
   
    return response.send("Funcionário adicionado com sucesso!");
    
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const funcionario_id: number = Number(request.params.funcionario_id);
    const { cargo, nome, data_nasc, telefone, email} = request.body;
    
    await funcionarioRepository.update(funcionario_id, cargo, nome, data_nasc, telefone, email);
   
    return response.send("Funcionário atualizado com sucesso!");
  }

}

export default FuncionarioController;