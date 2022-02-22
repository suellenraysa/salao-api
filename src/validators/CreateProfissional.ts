import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const schema = Yup.object().shape({
      nome: Yup.string().required('Nome é um campo obrigatório'),
      data_nasc: Yup.string().required(
        'Data de nascimento é um campo obrigatório',
      ),
      cpf: Yup.string().required('CPF é um campo obrigatório')
        .max(11, "O cpf só pode ter no máximo 11 números")
        .min(11, "O cpf deve ter no mínimo 11 números"),
      telefone: Yup.string().required('Telefone é um campo obrigatório'),
      email: Yup.string()
        .email('Email inválido')
        .required('Email é um campo obrigatório'),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'Campos inválidos', messages: err.inner });
  }
};