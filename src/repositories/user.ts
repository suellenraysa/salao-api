import tabelas from '../constants/tabelas';
import db from '../database/connection';

interface UsuarioProps {
  nome: string;
  cpf: string;
  data_nasc: string;
  sexo: string;
  telefone: string;
  email: string;
  login: string;
  senha: string;
}

export default class UsuarioRepository {
  private usuarios: UsuarioProps[] = [];

  async show(): Promise<any[]> {
    return await db(tabelas.cliente).where({});
  }

  async index(email: string): Promise<UsuarioProps | undefined> {
    return this.usuarios.find(usuario => usuario.email === email);
  }

  async store(data: UsuarioProps): Promise<UsuarioProps> {
    this.usuarios.push(data);
    return data;
  }
}
