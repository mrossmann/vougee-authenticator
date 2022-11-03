import { Request, Response } from 'express';
import { INonceSocket } from './common';

export interface IAuthorizedFunction {
  (req: Request, res: Response, nonceSocketMap?: INonceSocket[]): Promise<Object>;
};