/**
 * Interface extending the websocket object with an attribute 'id'
 */
export interface IWebSocket extends WebSocket {
  id?: string
}

/**
 * Interface representing the nonce-socket pair object
 */
export interface INonceSocketMap {
  nonce: string,
  socket: IWebSocket
}

/**
 * Interface used for the return of any scan function
 */
export interface IScanReturn {
  statusCode: number,
  button_text?: string,
  explanation_text?: string,
  sig_domain?: string
}