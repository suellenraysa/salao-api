import db from '../database/connection';
import tabelas from "../constants/tabelas";

export default class ServicosRepository {
    async show(): Promise<any[]> {
        return await db(tabelas.servicos).where({});
    }

    async findID(servicos_id: number): Promise<any[]> {
        return await db(tabelas.servicos).where({ servicos_id: servicos_id }).first();
    }

    async findNome(nome: string): Promise<any[]> {
        return await db(tabelas.servicos).where({ nome });
    }

    async findPesquisa(nome: string): Promise<any[]> {
        return await db(tabelas.servicos).where({ nome });
    }

    async deletar(servicos_id: number): Promise<any[]> {
        return await db(tabelas.servicos).where({ servicos_id: servicos_id }).del();
    }

    async create(nome: string, valor: number, comissao: number, tempo_servico: string, funcao_id:string): Promise<any[]> {
        return await db(tabelas.servicos).insert({
            nome, 
            valor, 
            comissao, 
            tempo_servico,
            funcao_id
        })
    }

    async update(servicos_id: number, funcao_id: number, nome: string, valor: number, comissao: number, tempo_servico: string): Promise<any[]> {
        return await db(tabelas.servicos)
            .where({ servicos_id: servicos_id })
            .update({
                funcao_id,
                nome, 
                valor, 
                comissao, 
                tempo_servico 
        })
    }
}