import { Request, Response } from "express";

function executeLambda(req: Request, res: Response): Object {
  return {
    execute_lambda_text: 'execute lambda text'
  };
}

function scanLambda(req: Request, res: Response): Object {
  return {
    scan_lambda_text: 'scan lambda text'
  };
}

export { executeLambda, scanLambda };