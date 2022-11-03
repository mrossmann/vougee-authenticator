export enum EProtocol {
  HTTPS = "https",
  HTTP = "http"
}

export enum ESubDomain {
  VOUGEE = "vougee.id",
  ZENIQ = "zeniq.id"
}

export enum EAddress {
  ZENIQ = "&t=1&tZENIQ-1",
  ETH = "&t=1&tETH",
  BTC = "&t=1&tBTC"
}

export enum EStatusCode {
  SUCCESS = 200,
  RETRY = 201,
  NONCE_MISSING = 400,
  SESSION_NOT_FOUND = 403,
  UNKNOWN_ADDRESS = 405,
  ALREADY_CONNECTED = 406,
}

export enum EStatusMessage {
  SUCCESS = 'success',
  RETRY = 'retry',
  NONCE_MISSING = 'nonce is missing',
  SESSION_NOT_FOUND = 'session could not be found',
  UNKNOWN_ADDRESS = 'unknown address',
  ALREADY_CONNECTED = 'device already connected',
}

export enum EGuardStatusCode {
  NONCE_SALT_MISSING = 410
}

export enum EGuardStatusMessage {
  NONCE_SALT_MISSING = 'nonce/salt entry does not exist'
}