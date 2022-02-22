import db from '../database/connection';
import tabelas from "../constants/tabelas";

export default class FuncaoRepository {
    async show(): Promise<any[]> {
        return await db(tabelas.funcao).where({}).orderBy("funcao_id");
    }

    async findID(funcao_id: number): Promise<any[]> {
        return await db(tabelas.funcao).where({ funcao_id: funcao_id }).first();
    }

    async deletar(funcao_id: number): Promise<any[]> {
        return await db(tabelas.funcao).where({ funcao_id: funcao_id }).del();
    }

    async create(nome_funcao: string): Promise<any[]> {
        return await db(tabelas.funcao).insert({
            nome_funcao: nome_funcao
        })
    }

    async update(funcao_id: number, nome_funcao: string): Promise<any[]> {
        return await db(tabelas.funcao)
            .where({ funcao_id: funcao_id })
            .update({
                nome_funcao: nome_funcao
        })
    }
}