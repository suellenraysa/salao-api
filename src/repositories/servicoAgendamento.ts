import tabelas from '../constants/tabelas';
import db from '../database/connection';

export default class ServicoAgendamentoRepository {
    async show(): Promise<any[]> {
        return await db(tabelas.servico_agendamento).where({}).join(tabelas.profissional, { 
            'profissional.profissional_id': 'servico_agendamento.funcionario_id' 
        });
    }

    async findID(agendamento_id: number): Promise<any[]> {
        return await db(tabelas.servico_agendamento).where({ agendamento_id: agendamento_id });
    }
    async findPorServico(servicos_id: number): Promise<any[]> {
        return await db(tabelas.servico_agendamento).where({ servicos_id: servicos_id });
    }

    async findPorProfissional(profissional_id: number): Promise<any[]> {
        return await db(tabelas.servico_agendamento).where({ profissional_id: profissional_id });
    }

    async deletar(agendamento_id: number): Promise<any[]> {
        return await db(tabelas.servico_agendamento).where({ agendamento_id: agendamento_id }).del();
    }

    async create(servicos_id: number, agendamento_id: number, profissional_id: number): Promise<any[]> {
        return await db(tabelas.servico_agendamento).insert({
            servicos_id,
            agendamento_id,
            profissional_id,
        })
    }

    async update(servicos_id: number, agendamento_id: number, profissional_id: number): Promise<any[]> {
        return await db(tabelas.servico_agendamento)
            .where({ agendamento_id: agendamento_id })
            .update({
            servicos_id,
            agendamento_id,
            profissional_id,
            })
    }
}