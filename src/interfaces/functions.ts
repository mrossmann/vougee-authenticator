import { Request, Response } from 'express'

export interface IAuthorizedFunction {
  (req: Request, res: Response): Promise<Object>;
};