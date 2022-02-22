import db from '../database/connection';
import tabelas from "../constants/tabelas";

export default class AgendamentoRepository {
    async show(cliente_id: Number): Promise<any[]> {
        return await db(tabelas.agendamento).where({ cliente_id: cliente_id})
        .join(tabelas.servico_agendamento, {
            'servico_agendamento.agendamento_id': 'agendamento.agendamento_id'
        })
        .join(tabelas.servicos, {
            'servico_agendamento.servicos_id': 'servicos.servicos_id'
        })
        .join(tabelas.profissional, { 
            'profissional.profissional_id': 'servico_agendamento.profissional_id' 
        })
        .orderBy("data_atendimento", "horario_agendamento")
    }

    async getAgendamentoDataCliente(cliente_id: Number, data_atendimento: string): Promise<any[]> {
        return await db(tabelas.agendamento).where({ cliente_id: cliente_id, data_atendimento: data_atendimento})
        .leftJoin(tabelas.servico_agendamento, {
            'servico_agendamento.agendamento_id': 'agendamento.agendamento_id'
        })
        .join(tabelas.servicos, {
            'servico_agendamento.servicos_id': 'servicos.servicos_id'
        })
        .join(tabelas.profissional, { 
            'profissional.profissional_id': 'servico_agendamento.profissional_id' 
        });
    }

    async getJaFezAgendamentos(cliente_id: Number): Promise<any[]> {
        return await db(tabelas.agendamento).where({ cliente_id: cliente_id})
        .rightJoin(tabelas.pagamento, {
            'agendamento.agendamento_id': 'pagamento.agendamento_id'
        })
        .count();
    }

    async getAgendamentoProfissional(profissional_id: Number, data_atendimento: string): Promise<any[]> {
        return await db(tabelas.servico_agendamento).where({ profissional_id: profissional_id })
        .join(tabelas.agendamento, {
            'servico_agendamento.agendamento_id': 'agendamento.agendamento_id'
        })
        .where({ data_atendimento: data_atendimento })
        .join(tabelas.servicos
            , {
            'servico_agendamento.servicos_id': 'servicos.servicos_id'
        })
        .join(tabelas.cliente, {
            'agendamento.cliente_id': 'cliente.cliente_id'
        })
        //.orderBy("horario_agendamento")
        .select(
            'cliente.cliente_id',
            'cliente.nome as nomeCliente',
            'agendamento.data_atendimento',
            'agendamento.inicio_atendimento',
            'agendamento.fim_atendimento',
            'agendamento.horario_agendamento',
            'agendamento.agendamento_id',
            'servico_agendamento.agendamento_id', 
            'servicos.servicos_id',
            'servicos.comissao',
            'servicos.valor',
            'servicos.nome as nomeServico',
            'servicos.tempo_servico',
        );
    }

    async getAgendamentoData(data_atendimento: string): Promise<any[]> {
        return await db(tabelas.agendamento).where({ data_atendimento: data_atendimento })
        .join(tabelas.servico_agendamento, {
            'servico_agendamento.agendamento_id': 'agendamento.agendamento_id'
        })
        .join(tabelas.servicos, {
            'servico_agendamento.servicos_id': 'servicos.servicos_id'
        })
        .join(tabelas.profissional, { 
            'profissional.profissional_id': 'servico_agendamento.profissional_id' 
        })
        .join(tabelas.cliente, {
            'agendamento.cliente_id': 'cliente.cliente_id'
        })
        .leftJoin(tabelas.pagamento, {
            'agendamento.agendamento_id': 'pagamento.agendamento_id'
        })
        .leftJoin(tabelas.forma_pagamento, {
            'pagamento.forma_pagamento_id': 'forma_pagamento.forma_pagamento_id'
        })
        .orderBy("cliente.nome")
        .select(
            'cliente.cliente_id',
            'cliente.nome as nomeCliente',
            'cliente.data_nasc',
            'agendamento.data_atendimento',
            'agendamento.horario_agendamento',
            'agendamento.inicio_atendimento',
            'agendamento.fim_atendimento',
            'agendamento.agendamento_id',
            'servico_agendamento.agendamento_id', 
            'servicos.servicos_id',
            'servicos.valor',
            'servicos.nome as nomeServico',
            'profissional.profissional_id',
            'profissional.nome as nomeProfissional',
            'pagamento.forma_pagamento_id',
            'forma_pagamento.forma_pagamento'
        );
    }

    async findID(agendamento_id: number): Promise<any[]> {
        return await db(tabelas.agendamento).where({ agendamento_id: agendamento_id }).first();
    }

    async deletar(agendamento_id: number): Promise<any[]> {
        return await db(tabelas.agendamento).where({ agendamento_id: agendamento_id }).del();
    }

    async iniciarAtendimento(agendamento_id: number): Promise<any[]> {
        return await db(tabelas.agendamento)
            .where({ agendamento_id: agendamento_id })
            .update({
                inicio_atendimento: true
            })
    }

    async encerrarAtendimento(agendamento_id: number): Promise<any[]> {
        return await db(tabelas.agendamento)
            .where({ agendamento_id: agendamento_id })
            .update({
                fim_atendimento: true
            })
    }
    

    async create(funcionario_id: number, cliente_id: number, data_atendimento: Date, inicio_atendimento: Date, total: number, data_agendamento: Date, horario_agendamento: Date): Promise<any> {
        return await db(tabelas.agendamento).insert({
            cliente_id,
            data_atendimento: new Date(data_atendimento),
            total,
            data_agendamento: new Date(data_agendamento),
            horario_agendamento: horario_agendamento,
        //})
        }).returning('agendamento_id')
    }

    async update(agendamento_id: number,  funcionario_id: number, cliente_id: number, data_atendimento: Date, inicio_atendimento: Date, total: number, data_agendamento: Date, horario_agendamento: Date): Promise<any[]> {
        return await db(tabelas.agendamento)
            .where({ agendamento_id: agendamento_id })
            .update({
                funcionario_id,
                cliente_id,
                data_atendimento: new Date(data_atendimento),
                inicio_atendimento,
                total,
                data_agendamento,
                horario_agendamento
            })
    }

    async relatorioServico(profissional_id: number, servicos_id: number, from: string, to: string): Promise<any[]> {
        let query: any = {};

        if(profissional_id) query["servico_agendamento.profissional_id"] = Number(profissional_id);

        if(servicos_id) query["servico_agendamento.servicos_id"] = Number(servicos_id);

        return await db(tabelas.servico_agendamento)
        .where(query)     
        .join(tabelas.agendamento, {
            'servico_agendamento.agendamento_id': 'agendamento.agendamento_id'
        })
        .andWhereBetween('data_atendimento', [from, to])
        .join(tabelas.servicos, {
            'servico_agendamento.servicos_id': 'servicos.servicos_id'
        })
        .join(tabelas.profissional, { 
            'profissional.profissional_id': 'servico_agendamento.profissional_id' 
        })
        .select(
            'profissional.profissional_id',
            'profissional.nome as nome_profissional',
            'agendamento.agendamento_id',
            'agendamento.data_agendamento',
            'agendamento.data_atendimento',
            'agendamento.horario_agendamento',
            'servicos.servicos_id',
            'servicos.nome as nome_servico',
            'servicos.valor',
            'servicos.comissao',            
        )        
    }

    async relatorioComissao(profissional_id: number, from: Date, to: Date): Promise<any[]> {
        return await db(tabelas.agendamento)
        .select(
            'profissional.nome as nome_profissional',
            'agendamento.data_agendamento',
            'servicos.nome as nome_servico',
            'servicos.valor as valor_servico',
            'servicos.comissao as porcentagem_comissao',
            'ceil(valor * comissao/100) as valor_comissao'
        )
        .join(tabelas.servico_agendamento, {
            'servico_agendamento.agendamento_id': 'agendamento.agendamento_id'
        })
        .join(tabelas.servicos, {
            'servico_agendamento.servicos_id': 'servicos.servicos_id'
        })
        .join(tabelas.profissional, { 
            'profissional.profissional_id': 'servico_agendamento.profissional_id' 
        })
        .where({ profissional_id: profissional_id }).andWhereBetween('data_agendamento', [from, to]);
    }
}