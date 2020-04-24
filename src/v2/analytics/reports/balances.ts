import { ThAnalyticsBaseHandler, ThAnalyticsBaseResultItem, ThAnalyticsExportsBaseResponse } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'

export interface BalancesHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsBalancesOverviewResponseItem {
  data: object[]
  summary: object[]
  metaData: {
    count: number
    total_count: number
  }
  next?: () => Promise<AnalyticsReportsBalancesOverviewResponseItem>
}

export interface AnalyticsReportsBalancesDetailResponseItem {
  data: object
  metaData: {
    count: number
    total_count: number
  }
}

export interface AnalyticsReportsBalancesOverviewExportResponseItem extends ThAnalyticsExportsBaseResponse {

}

export class AnalyticsReportsBalancesOverview extends ThAnalyticsBaseHandler {
  http: Client
  public options: BalancesHandlerOptions

  constructor(options: BalancesHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(options: object, http: Client): AnalyticsReportsBalancesOverview {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsBalancesOverview, options, http)
  }

  public async getAll(query?: object): Promise<AnalyticsReportsBalancesOverviewResponseItem> {
    try {
      let nextFn
      const { results: d, next } = await this.handleGet(`${this.options.base}/api/v2/analytics/${this.options.user}/reports/balances/overview`, query)

      // @ts-ignore
      const data = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_balances_v2_overview_data')).values
      // @ts-ignore
      const summary = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_balances_v2_overview_summary')).values
      // @ts-ignore
      const count = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_balances_v2_overview_filtered_meta')).values[0]
      // @ts-ignore
      const totalCount = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_balances_v2_overview_meta')).values[0]

      if (next) {
        nextFn = (): Promise<AnalyticsReportsBalancesOverviewResponseItem> => this.getAll({ uri: next })
      }

      return {
        data: data,
        summary: summary,
        metaData: {
          // @ts-ignore
          count: count.count,
          // @ts-ignore
          total_count: totalCount.count
        },
        next: nextFn
      }
    } catch (err) {
      throw new AnalyticsReportsBalancesOverviewFetchError(undefined, { error: err })
    }
  }

  public async export(query?: object): Promise<AnalyticsReportsBalancesOverviewExportResponseItem> {
    try {
      const result = await this.handleExport(`${this.options.base}/api/v2/analytics/${this.options.user}/reports/balances/overview`, query)
      return result
    } catch (err) {
      throw new AnalyticsReportsBalancesOverviewExportFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsBalancesDetail extends ThAnalyticsBaseHandler {
  http: Client
  public options: BalancesHandlerOptions

  constructor(options: BalancesHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(options: object, http: Client): AnalyticsReportsBalancesDetail {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsBalancesDetail, options, http)
  }

  public async get(id?: string): Promise<AnalyticsReportsBalancesDetailResponseItem> {
    try {
      const { results: d } = await this.handleGet(`${this.options.base}/api/v2/analytics/${this.options.user}/reports/balances/${id}/detail`)

      // @ts-ignore
      const data = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_balances_v2_balance_detail_data')).values

      return {
        data: data[0],
        metaData: {
          count: 1,
          total_count: 1
        }
      } as AnalyticsReportsBalancesDetailResponseItem
    } catch (err) {
      throw new AnalyticsReportsTransactionDetailFetcshError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsBalancesOverviewFetchError extends BaseError {
  public name = 'AnalyticsReportsBalancesOverviewFetchError'
  constructor(public message: string = 'Could not fetch balance overview. ', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsBalancesOverviewFetchError.prototype)
  }
}

export class AnalyticsReportsTransactionDetailFetcshError extends BaseError {
  public name = 'AnalyticsReportsTransactionDetailFetcshError'
  constructor(public message: string = 'Could not fetch balance detail. ', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsTransactionDetailFetcshError.prototype)
  }
}

export class AnalyticsReportsBalancesOverviewExportFetchError extends BaseError {
  public name = 'AnalyticsReportsBalancesOverviewExportFetchError'
  constructor(public message: string = 'Could not fetch balance overview export. ', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsBalancesOverviewExportFetchError.prototype)
  }
}
