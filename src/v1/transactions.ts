import { Client } from '../client'
import * as errors from '../errors'

export interface PdfRequestObject {
  transactionId: string
  template: string
  query?: TransactionsQuery
}

export interface TransactionsQuery {
  uri?: string
  format?: string
}

export interface TransactionsOptions {
  user?: string
  base?: string
}

export interface TransactionResponse {
  data: object[]
}

enum SignatureTypes {
  Fiksaltrust = 'fiskaltrust'
}

interface FiskaltrustAuth {
  cashbox: string
  cashbox_auth: string
}

export class Transactions {
  endpoint: string
  http: Client
  signing: Signing
  public options: TransactionsOptions

  constructor(options: TransactionsOptions, http: Client) {
    this.options = options
    this.http = http
    this.signing = new Signing(options, http)

    this.endpoint = '/api/v1/transactions'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: TransactionsQuery | undefined): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/legacy`
        }

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<TransactionResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as TransactionResponse)
      } catch (err) {
        return reject(new errors.TransactionFetchFailed())
      }
    })
  }

  pdfUri(requestObject: PdfRequestObject): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      const { query, transactionId, template } = requestObject

      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${
            this.options.user
            }/${transactionId}/legacy/${template}/pdf`
        }

        if (query && query.format) {
          uri = `${uri}?format=${query.format}`
        }

        const response = await this.http.getClient().post(uri, null, {
          headers: {
            Accept: 'application/json' // not needed for tillhub-api, but axios sets default headers { 'accept': 'application/json, text/plain, */*' } if not specified
          }
        })

        return resolve({
          data: response.data.results
        } as TransactionResponse)
      } catch (err) {
        return reject(new errors.TransactionPdfFailed(err.message))
      }
    })
  }
}

export class Signing {
  endpoint: string
  http: Client
  public options: TransactionsOptions

  constructor(options: TransactionsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v1/transactions'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  initialise(
    singingResourceType: string,
    singingResource: string,
    signingSystem: string,
    signingConfiguration: FiskaltrustAuth
  ): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri = `${this.options.base}${this.endpoint}/${
          this.options.user
          }/legacy/signing/${singingResourceType}/${singingResource}/${signingSystem}/initialise`

        const response = await this.http.getClient().post(uri, signingConfiguration, {
          headers: {
            Accept: 'application/json'
          }
        })

        return resolve({
          data: response.data.results
        } as any)
      } catch (err) {
        return reject(new errors.TransactionSigningInitialisationFailed(err.message))
      }
    })
  }

  yearly(
    singingResourceType: string,
    singingResource: string,
    signingSystem: string
  ): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri = `${this.options.base}${this.endpoint}/${
          this.options.user
          }/legacy/signing/${singingResourceType}/${singingResource}/${signingSystem}/yearly`

        const response = await this.http.getClient().post(uri, undefined, {
          headers: {
            Accept: 'application/json'
          }
        })

        return resolve({
          data: response.data.results
        } as any)
      } catch (err) {
        return reject(new errors.TransactionSigningYearlyReceiptFailed(err.message))
      }
    })
  }

  monthly(
    singingResourceType: string,
    singingResource: string,
    signingSystem: string
  ): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri = `${this.options.base}${this.endpoint}/${
          this.options.user
          }/legacy/signing/${singingResourceType}/${singingResource}/${signingSystem}/monthly`

        const response = await this.http.getClient().post(uri, undefined, {
          headers: {
            Accept: 'application/json'
          }
        })

        return resolve({
          data: response.data.results
        } as any)
      } catch (err) {
        return reject(new errors.TransactionSigningMonthlyReceiptFailed(err.message))
      }
    })
  }

  zero(
    singingResourceType: string,
    singingResource: string,
    signingSystem: string
  ): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri = `${this.options.base}${this.endpoint}/${
          this.options.user
          }/legacy/signing/${singingResourceType}/${singingResource}/${signingSystem}/zero`

        const response = await this.http.getClient().post(uri, undefined, {
          headers: {
            Accept: 'application/json'
          }
        })

        return resolve({
          data: response.data.results
        } as any)
      } catch (err) {
        return reject(new errors.TransactionSigningZeroReceiptFailed(err.message))
      }
    })
  }
}
