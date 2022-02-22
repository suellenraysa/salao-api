import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const schema = Yup.object().shape({
      forma_pagamento_id: Yup.number().required('Forma de pagamento é um campo obrigatório'), 
      atendimentos: Yup.array().required('agendamento um campo obrigatório'), 
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'Campo inválido', messages: err.inner });
  }
};