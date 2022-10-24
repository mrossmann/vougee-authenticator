import { Request, Response } from 'express'
import { IAuthorizedFunction } from './interfaces/functions';
import { IRequestUrl } from './interfaces/requestUrl';
import { EProtocol, EAddress, ESubDomain } from './enums/common';
import { IWebSocket, INonceSocketMap } from './interfaces/common';


/**
 * Initializes an empty nonce-socket map
 * @returns an empty nonce-socket map {@link INonceSocketMap}
 */
function initializeNonceSocketMap(): INonceSocketMap[] {
  let nonceSocketMap: INonceSocketMap[] = [];
  return nonceSocketMap;
}

/**
 * Adds a new entry into the given nonce-socket map
 * @param nonce The nonce generated for the socket
 * @param socket The socket object {@link IWebSocket}
 * @param nonceSocketMap The nonce-socket map {@link INonceSocketMap}
 */
function addSocketToNonceSocketMap(nonce: string, socket: IWebSocket, nonceSocketMap: INonceSocketMap[]): void {
  nonceSocketMap.push({nonce: nonce, socket: socket});
}

/**
 * Get a socket object {@link IWebSocket} from the socket map {@link INonceSocketMap} or undefined
 * if socket object does not exist
 * @param nonce The nonce used to identify the socket object
 * @param nonceSocketMap The nonce-socket map to retrieve the socket object 
 * @returns a socket object or undefined if no socket object is found in the given nonce-socket map
 */
function getSocketFromNonceSocketMap(nonce: string, nonceSocketMap: INonceSocketMap[]): IWebSocket | undefined {
  const mapEntry = nonceSocketMap.find(s => s.nonce === nonce);
  return mapEntry?.socket;
}

/**
 * Remove a socket object {@link IWebSocket} from a given nonce-socket map {@link INonceSocketMap}
 * @param nonce The nonce used to identify the socket object
 * @param nonceSocketMap The map to remove the socket object from
 */
function removeSocketFromNonceSocketMap(nonce: string, nonceSocketMap: INonceSocketMap[]): void {
  const mapEntryIndex = nonceSocketMap.findIndex(s => s.nonce === nonce);
  nonceSocketMap.splice(mapEntryIndex, 1);
}

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
    console.log(await nonceSocketMap?.length);
    
    res.status(200).end();
  }

  if(!scan_lambda) {
    return [execute];
  } else {
    return [execute, scan];
  }
}

function generateRequestUrl(): IRequestUrl {
  let requestUrl: IRequestUrl = {
    protocol: EProtocol.HTTPS,
    subDomain: ESubDomain.ZENIQ,
    domain: 'localhost',
    port: 8080,
    execute: 'executeFunctionName',
    load: 'loadFunctionName',
    nonce: 'rand0mStr1ng',
  }

  return requestUrl;
}

export {
  greeter,
  authorize,
  generateRequestUrl,
  IRequestUrl,
  EAddress,
  EProtocol,
  ESubDomain,
  IAuthorizedFunction,
  IWebSocket,
  INonceSocketMap,
  initializeNonceSocketMap,
  addSocketToNonceSocketMap,
  getSocketFromNonceSocketMap,
  removeSocketFromNonceSocketMap
};