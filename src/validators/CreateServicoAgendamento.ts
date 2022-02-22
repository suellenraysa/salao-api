import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const schema = Yup.object().shape({
      servico_id: Yup.string().required('Serviço é um campo obrigatório'),
      // inicio_atendimento: Yup.string().required('inicio do atendimento é um campo obrigatório'),
      agendamento_id: Yup.string().required(
        'Agendamento do atendimento é um campo obrigatório',
      ),
      profissional_id: Yup.string().required('Profissional é um campo obrigatório'),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'Campos inválidos', messages: err.inner });
  }
};

