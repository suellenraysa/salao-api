import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const schema = Yup.object().shape({
      data_atendimento: Yup.string().required('Data é um campo obrigatório'),
      data_agendamento: Yup.string().required(
        'Data do atendimento é um campo obrigatório',
      ),
      total: Yup.string().required('Valor total é um campo obrigatório'),
      horario_agendamento: Yup.string().required('horario do agendamento é um campo obrigatório'),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'Campos inválidos', messages: err.inner });
  }
};