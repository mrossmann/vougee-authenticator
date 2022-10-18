import { Request, Response } from 'express'
import { IWebSocket } from './common';

export interface IAuthorizedFunction {
  (req: Request, res: Response, socket?: IWebSocket): Promise<Object>;
};