import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

function authenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) throw new Error('Token é obrigatório');

  const [, token] = authorizationHeader.split(' ');

  try {
    verify(token, "asd");

    return next();
  } catch (err) {
    throw new Error('Token é obrigatório');
  }
}

export default authenticated;
