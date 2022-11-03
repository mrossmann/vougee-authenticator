import { EStatusCode } from "../enums/common"

/**
 * Interface extending the websocket object with an attribute 'id'
 */
export interface IWebSocket extends WebSocket {
  id?: string
}

/**
 * Interface representing the nonce-socket pair object
 */
export interface INonceSocket {
  nonce: string,
  socket: IWebSocket
}

/**
 * Interface representing the nonce-salt pair object
 */
export interface INonceSalt {
  nonce: string,
  salt: string
}

/**
 * Interface used for the return of any scan function
 */
export interface IScanReturn {
  statusCode: EStatusCode,
  zeniqauth_version?: string,
  error_message?: string,
  xdata?: string,
  msg?: string,
  d?: string,
  w?: string,
  button_text?: string,
  explanation_text?: string,
  sig_domain?: string
}

export interface IExecuteReturn {
  statusCode: EStatusCode,
  msg?: string,
  error_message?: string
}