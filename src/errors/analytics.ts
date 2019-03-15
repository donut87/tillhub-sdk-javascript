import { BaseError } from './baseError'

export class ReportsBalancesFetchAllFailed extends BaseError {
  public name = 'ReportsBalancesFetchAllFailed'
  constructor(public message: string = 'Could not fetch all the balances', properties?: any) {
    super(message, properties)
  }
}

export class ReportsBalancesFetchOneFailed extends BaseError {
  public name = 'ReportsBalancesFetchOneFailed'
  constructor(public message: string = 'Could not fetch one balance', properties?: any) {
    super(message, properties)
  }
}

export class ReportsBalancesMetaFailed extends BaseError {
  public name = 'ReportsBalancesMetaFailed'
  constructor(public message: string = 'Could not fetch meta data for balances', properties?: any) {
    super(message, properties)
  }
}

export class ReportsPaymentOptionsFetchAllFailed extends BaseError {
  public name = 'ReportsPaymentOptionsFetchAllFailed'
  constructor(
    public message: string = 'Could not fetch all the payment options',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class ReportsPaymentsFetchAllFailed extends BaseError {
  public name = 'ReportsPaymentsFetchAllFailed'
  constructor(public message: string = 'Could not fetch all the payments', properties?: any) {
    super(message, properties)
  }
}

export class ReportsPaymentsMetaFailed extends BaseError {
  public name = 'ReportsPaymentsMetaFailed'
  constructor(public message: string = 'Could not fetch meta data for payments', properties?: any) {
    super(message, properties)
  }
}
