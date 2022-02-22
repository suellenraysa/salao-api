import tabelas from '../constants/tabelas';
import db from '../database/connection';

export default class UsuarioRepository {
    async show(): Promise<any[]> {
        return await db(tabelas.usuario).where({});
    }

    async findID(usuario_id: number): Promise<any[]> {
        return await db(tabelas.usuario).where({ usuario_id: usuario_id }).first();
    }

    async findLogin(login: string): Promise<any> {
        return await db(tabelas.usuario).where({ login }).first();
    }

    async deletar(usuario_id: number): Promise<any[]> {
        return await db(tabelas.usuario)
            .where({ usuario_id: usuario_id })
            .update({ ativo: false });
    }

    async create( perfil_acesso_id: number, cliente_id: number,login: string, senha: string): Promise<any[]> {
        return await db(tabelas.usuario).insert({
            perfil_acesso_id,
            cliente_id,
            login,
            senha,
            ativo: true
        })
    }

    async createFunc( perfil_acesso_id: number, funcionario_id: number,login: string, senha: string): Promise<any[]> {
        return await db(tabelas.usuario).insert({
            perfil_acesso_id,
            funcionario_id,
            login,
            senha,
            ativo: true
        })
    }

    async createProf( perfil_acesso_id: number, profissional_id: number,login: string, senha: string): Promise<any[]> {
        return await db(tabelas.usuario).insert({
            perfil_acesso_id,
            profissional_id,
            login,
            senha,
            ativo: true
        })
    }

    async update(usuario_id: number, perfil_acesso_id: number, cliente_id: number, funcionario_id: number, profissional_id: number, login: string, senha : string): Promise<any[]> {
        return await db(tabelas.usuario)
            .where({ usuario_id: usuario_id })
            .update({
                perfil_acesso_id,
                cliente_id,
                funcionario_id,
                profissional_id,
                login,
                senha 
        })
    }

    async updateCliente(cliente_id: number, login: string, senha : string | undefined): Promise<any[]> {
        let atualizar: any = {
            login: login
        };

        if(senha) atualizar.senha = senha;

        return await db(tabelas.usuario)
            .where({ cliente_id: cliente_id })
            .update(atualizar);
    }

    async desativar(cliente_id: number): Promise<any[]> {
        return await db(tabelas.usuario)
            .where({ cliente_id: cliente_id })
            .update({
                ativo: false
            });
    }

    async ativar(cliente_id: number): Promise<any[]> {
        return await db(tabelas.usuario)
            .where({ cliente_id: cliente_id })
            .update({
                ativo: true
            });
    }
}