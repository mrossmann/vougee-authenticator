import { Request, Response } from 'express'

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
function authorize(execute_lambda: Function, scan_lambda?: Function): Function[] {

  async function scan(req: Request, res: Response) {
    console.log('### scan called ###');
    const scan_lambda_json = await scan_lambda?.(req, res);

    console.log('--- json data ---');
    console.log(scan_lambda_json);

    res.set('Content-Type', 'application/json');
    res.status(201).json(scan_lambda_json);

    console.log('--- scan end ---');
  }

  async function execute(req: Request, res: Response) {
    console.log('### execute called ###');
    let execute_lambda_json = execute_lambda(req, res);
    console.log('--- json data ---');
    console.log(execute_lambda_json);
    
    res.status(200).end();

    console.log('--- execute end ---');
  }

  if(!scan_lambda) {
    return [execute];
  } else {
    return [execute, scan];
  }
}

export { greeter, authorize };