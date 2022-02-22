import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const schema = Yup.object().shape({
      cargo: Yup.string().required('Cargo é um campo obrigatório'),
      nome: Yup.string().required('Nome é um campo obrigatório'),
      // cpf: Yup.string().required('CPF é um campo obrigatório'),
      data_nasc: Yup.string().required(
        'Data de nascimento é um campo obrigatório',
      ),
      
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