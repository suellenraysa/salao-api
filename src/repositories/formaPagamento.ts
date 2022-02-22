import db from '../database/connection';
import tabelas from "../constants/tabelas";

export default class FormaPagamentoRepository {
    async show(): Promise<any[]> {
        return await db(tabelas.forma_pagamento).where({});
    }

    async findID(forma_pagamento_id: number): Promise<any[]> {
        return await db(tabelas.forma_pagamento).where({ forma_pagamento_id: forma_pagamento_id }).first();
    }

    async deletar(forma_pagamento_id: number): Promise<any[]> {
        return await db(tabelas.forma_pagamento).where({ forma_pagamento_id: forma_pagamento_id }).del();
    }

    async create(forma_pagamento: string): Promise<any[]> {
        return await db(tabelas.forma_pagamento).insert({
            forma_pagamento: forma_pagamento
        })
    }

    async update(forma_pagamento_id: number, forma_pagamento: string): Promise<any[]> {
        console.log(forma_pagamento_id)
        return await db(tabelas.forma_pagamento)
            .where({ forma_pagamento_id: forma_pagamento_id })
            .update({
                forma_pagamento: forma_pagamento
            })
    }
}