import { Request, Response } from 'express';
import { INonceSocketMap } from './common';

export interface IAuthorizedFunction {
  (req: Request, res: Response, nonceSocketMap?: INonceSocketMap[]): Promise<Object>;
};