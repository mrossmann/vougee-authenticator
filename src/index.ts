import { Request, Response } from 'express'
import { IAuthorizedFunction } from './interfaces/functions';

/**
 * Prints greeting message from the VouGee Authenticator
 */
function greeter(): string {
  return '### VouGee Authenticator ###';
}

/**
 * 
 * @param execute_lambda The execute method that performs the authenticate process.
 * @param scan_lambda The scan method can be used to override the default information that
 * is being shown to the user on the Zeniq App. This method should be called before the execute
 * method to provide the user information on what the user is going to authenticate.
 * @returns array of methods: execute (mandatory) | scan (optional)
 */
function authorize(execute_lambda: IAuthorizedFunction, scan_lambda?: IAuthorizedFunction): Function[] {

  async function scan(req: Request, res: Response) {
    const scan_lambda_json = await scan_lambda?.(req, res);
    res.set('Content-Type', 'application/json');
    res.status(201).json(scan_lambda_json);
  }

  async function execute(req: Request, res: Response) {
    let execute_lambda_json = execute_lambda(req, res);
    console.log('--- execute json data ---');
    console.log(execute_lambda_json);
    
    res.status(200).end();
  }

  if(!scan_lambda) {
    return [execute];
  } else {
    return [execute, scan];
  }
}

export {
  greeter,
  authorize,
  IAuthorizedFunction
};