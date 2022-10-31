import { Request, Response } from 'express';
import { IAuthorizedFunction } from '../interfaces/functions';
import { INonceSocketMap } from '../interfaces/common';


/**
* 
* @param execute_lambda The execute method that performs the authenticate process.
* @param scan_lambda The scan method can be used to override the default information that
* is being shown to the user on the Zeniq App. This method should be called before the execute
* method to provide the user information on what the user is going to authenticate.
* @returns array of methods: execute (mandatory) | scan (optional)
*/
function authorize(execute_lambda: IAuthorizedFunction, scan_lambda?: IAuthorizedFunction): Function[] {

  async function scan(req: Request, res: Response, nonceSocketMap?: INonceSocketMap[]) {
    const scan_lambda_json = await scan_lambda?.(req, res, nonceSocketMap);
    res.set('Content-Type', 'application/json');
    res.status(201).json(scan_lambda_json);
  }

  async function execute(req: Request, res: Response, nonceSocketMap?: INonceSocketMap[]) {
    let execute_lambda_json = await execute_lambda(req, res, nonceSocketMap);
    console.log('--- execute lampda json ---');
    console.log(execute_lambda_json)

    console.log('--- socket map entries ---');
    console.log(nonceSocketMap?.length);

    res.status(200).end();
  }

  if (!scan_lambda) {
    return [execute];
  } else {
    return [execute, scan];
  }
}

export { authorize };