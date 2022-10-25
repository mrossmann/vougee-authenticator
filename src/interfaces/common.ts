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