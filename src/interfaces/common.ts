
export interface IWebSocket extends WebSocket {
  id?: string
}

export interface ISocketMap {
  nonce: string,
  socket: IWebSocket
}