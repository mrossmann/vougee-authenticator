import { EProtocol } from '../enums/common'

export interface IRequestUrl {
  protocol: EProtocol,
  subDomain: string,
  domain: string,
  port: number,
  nonce: string,
  execute: string,
  params?: string[],
  load?: string
}