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
        valor: Yup.number().required('Valor é um campo obrigatório'),
        comissao: Yup.number().required('Comissão é um campo obrigatório'),
        tempo_servico: Yup.string().required('Tempo de serviço é um campo obrigatório')
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'Campos inválidos', messages: err.inner });
  }
};

