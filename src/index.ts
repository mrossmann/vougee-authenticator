import { Request, Response } from 'express'
import { IAuthorizedFunction } from './interfaces/functions';
import { IRequestUrl } from './interfaces/requestUrl';
import { EProtocol, EAddress, ESubDomain } from './enums/common';
import { IWebSocket, ISocketMap } from './interfaces/common';

/**
 * Array storing connected sockets
 */
let socketMap: ISocketMap[] = [];

/**
 * Adds a given socket to the socket map
 * @param nonce The nonce generated for the socket
 * @param socket The socket object used to emit events
 */
function addSocketToSocketMap(nonce: string, socket: IWebSocket): void {
  socketMap.push({nonce: nonce, socket: socket});
}

/**
 * Get a socket from the socket map or undefined if socket object does not exist
 * @param nonce The nonce used to get the socket object
 * @returns a socket object of type IWebSocket
 */
function getSocketFromSocketMap(nonce: string): IWebSocket | undefined {
  const mapEntry = socketMap.find(s => s.nonce === nonce);
  return mapEntry?.socket;
}

/**
 * Remove a IWebSocket object from the socket map
 * @param nonce The nonce used to identify the IWebSocket object
 */
function removeSocketFromSocketMap(nonce: string): void {
  const mapEntryIndex = socketMap.findIndex(s => s.nonce === nonce);
  socketMap.splice(mapEntryIndex, 1);
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

  async function scan(req: Request, res: Response, socket?: IWebSocket) {
    const scan_lambda_json = await scan_lambda?.(req, res, socket);
    res.set('Content-Type', 'application/json');
    res.status(201).json(scan_lambda_json);
  }

  async function execute(req: Request, res: Response, socket?: IWebSocket) {
    let execute_lambda_json = await execute_lambda(req, res, socket);
    console.log('--- execute lampda json ---');
    console.log(execute_lambda_json)

    console.log('--- socket map entries ---');
    console.log(await socketMap.length);
    
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
  ISocketMap,
  socketMap,
  addSocketToSocketMap,
  getSocketFromSocketMap,
  removeSocketFromSocketMap
};