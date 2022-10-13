import { Request, Response } from "express";

async function executeLambda(req: Request, res: Response): Promise<Object> {
  return {
    execute_lambda_text: 'execute lambda text'
  };
}

async function scanLambda(req: Request, res: Response): Promise<Object> {
  return {
    scan_lambda_text: 'scan lambda text'
  };
}

export { 
  executeLambda,
  scanLambda
};