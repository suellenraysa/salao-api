import db from '../database/connection';
import tabelas from "../constants/tabelas";

export default class FuncionarioRepository {
    async show(): Promise<any[]> {
        return await db(tabelas.funcionario).where({});
    }

    async findID(funcionario_id: number): Promise<any[]> {
        return await db(tabelas.funcionario).where({ funcionario_id: funcionario_id }).first();
    }

    async deletar(funcionario_id: number): Promise<any[]> {
        return await db(tabelas.funcionario).where({ funcionario_id: funcionario_id }).del();
    }

    async findEmail(email: string): Promise<any[]> {
        return await db(tabelas.funcionario).where({ email }).first();
    }

    async findCpf(cpf: string): Promise<any[]> {
        return await db(tabelas.funcionario).where({ cpf }).first();
    }

    async create(cargo: string, nome: string, cpf: string, data_nasc: string, telefone: string, email: string): Promise<any[]> {
        return await db(tabelas.funcionario).insert({
            cargo,
            nome,
            cpf,
            data_nasc: new Date(data_nasc),
            telefone,
            email
        }).returning('funcionario_id')
    }

    async update(funcionario_id: number, cargo: string, nome: string, data_nasc: string, telefone: string, email: string): Promise<any[]> {
        return await db(tabelas.funcionario)
            .where({ funcionario_id: funcionario_id })
            .update({
                cargo,
                nome,
                data_nasc: new Date(data_nasc),
                telefone,
                email 
            })
    }
}

