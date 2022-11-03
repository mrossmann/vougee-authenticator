import { Request, Response } from 'express';
import { IAuthorizedFunction } from '../interfaces/functions';
import { INonceSocket } from '../interfaces/common';
import { EStatusCode, EStatusMessage } from '../enums/common';
import { Guard } from './guard';


/**
* 
* @param execute_lambda The execute method that performs the authenticate process.
* @param scan_lambda The scan method can be used to override the default information that
* is being shown to the user on the Zeniq App. This method should be called before the execute
* method to provide the user information on what the user is going to authenticate.
* @returns array of methods: execute (mandatory) | scan (optional)
*/
function authorize(execute_lambda: IAuthorizedFunction, scan_lambda?: IAuthorizedFunction): Function[] {

  async function scan(req: Request, res: Response, nonceSocketMap?: INonceSocket[]): Promise<void> {
    console.log('--- scan called ---');
    const { nonce, salt }: { nonce: string, salt: string } = req.body;

    if (!nonce) { res.status(EStatusCode.NONCE_MISSING).json(EStatusMessage.NONCE_MISSING) }

    Guard.getInstance().addNonceSaltMapEntry(nonce, salt);

    const scan_lambda_json = await scan_lambda?.(req, res, nonceSocketMap);

    res.set('Content-Type', 'application/json');
    res.status(200).json(scan_lambda_json);

  }

  async function execute(req: Request, res: Response, nonceSocketMap?: INonceSocket[]): Promise<void> {
    console.log('--- execute called ---');
    const { nonce, salt }: { nonce: string, salt: string } = req.body;

    if (!nonce) { res.status(EStatusCode.NONCE_MISSING).json(EStatusMessage.NONCE_MISSING) }

    if (!Guard.getInstance().checkNonceSaltMapEntryExists(nonce, salt)) {
      res.status(EStatusCode.NONCE_SALT_NOT_FOUND).json(EStatusMessage.NONCE_SALT_NOT_FOUND)
    }

    let execute_lambda_json = await execute_lambda(req, res, nonceSocketMap);

    res.status(200).json(execute_lambda_json);

    Guard.getInstance().removeNonceSaltMapEntry(nonce);
  }

  if (!scan_lambda) {
    return [execute];
  } else {
    return [execute, scan];
  }
}

export { authorize };