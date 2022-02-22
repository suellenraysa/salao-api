import { Request, Response } from 'express';

class PerfilController {
  public async show(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}

export default PerfilController;
