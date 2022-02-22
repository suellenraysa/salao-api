import db from '../database/connection';
import tabelas from "../constants/tabelas";

export default class ProfissionalRepository {
    async show(): Promise<any[]> {
        return await db(tabelas.profissional).where({});
    }

    async findID(profissional_id: number): Promise<any[]> {
        return await db(tabelas.profissional).where({ profissional_id: profissional_id }).first();
    }

    async findEmail(email: string): Promise<any[]> {
        return await db(tabelas.profissional).where({ email }).first();
    }

    async findCpf(cpf: string): Promise<any[]> {
        return await db(tabelas.profissional).where({ cpf }).first();
    }

    async deletar(profissional_id: number): Promise<any[]> {
        return await db(tabelas.profissional).where({ profissional_id: profissional_id }).del();
    }

    async create(nome: string, data_nasc: string, cpf: string, telefone: string, email: string): Promise<any[]> {
        return await db(tabelas.profissional).insert({
            nome,
            data_nasc: new Date(data_nasc),
            cpf,
            telefone,
            email
        }).returning('profissional_id')
    }

    async update(profissional_id: number, nome: string, data_nasc: string, telefone: string, email: string): Promise<any[]> {
        return await db(tabelas.profissional)
            .where({ profissional_id: profissional_id })
            .update({
                nome,
                data_nasc: new Date(data_nasc),
                telefone,
                email 
        })
    }
}