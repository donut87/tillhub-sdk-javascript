import axios, { AxiosInstance } from 'axios'

import { environment } from './environment'

export interface ClientOptions {
  base?: string
  timeout?: number
  headers?: object
  token?: string
}

const defaultHeaders = {
  'X-Client-Type': 'Tillhub SDK JavaScript',
  'X-Client-Version': environment.VERSION
}

/**
 * The Tillhub HTTP client is an axios instance that carries the state of of Authentication
 * in - if default headers have been set - has Authorization header.
 *
 * Since this class is a singleton we are destroying state internally through `.clearInstance()`.
 */
export class Client {
  private static instance: Client
  private axiosInstance: AxiosInstance

  private constructor(options: ClientOptions) {
    this.axiosInstance = axios.create({
      // baseURL: options.base || 'https://api.tillhub.com',
      timeout: options.timeout || 10000,
      headers: {
        ...options.headers,
        ...defaultHeaders
      }
    })
  }

  static getInstance(options: ClientOptions): Client {
    // use headers in any case
    if (Client.instance) {
      Client.instance.setDefaults(options)
    }

    if (!Client.instance) {
      Client.instance = new Client(options)
      // ... any one time initialization goes here ...
    }

    return Client.instance
  }

  static clearInstance(): void {
    Client.instance.clearDefaults()
  }

  getClient(): AxiosInstance {
    return Client.instance.axiosInstance
  }

  setDefaults(options: ClientOptions): Client {
    Client.instance.axiosInstance.defaults.headers.common = {
      ...this.axiosInstance.defaults.headers.common,
      ...options.headers
    }

    return Client.instance
  }

  clearDefaults(): void {
    Client.instance.axiosInstance.defaults.headers.common = {
      ...defaultHeaders
    }
  }
}
