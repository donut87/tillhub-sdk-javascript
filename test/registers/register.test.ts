import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

dotenv.config()
import { TillhubClient, v1, v0 } from '../../src/tillhub-js'

let user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME || user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD || user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID || user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY || user.apiKey
}

const legacyId = '4564'
const mockRegister = {
  'id': '1337',
  'created_at': { 'iso': '2018-04-23T08:46:16.012Z', 'unix': 1524473176012 },
  'updated_at': { 'iso': '2019-01-18T12:44:41.261Z', 'unix': 1547815481261 },
  'device_id': 'someDeviceId',
  'token_id': 'someTokenId',
  'active': true,
  'deleted': false,
  'shop': null,
  'name': null,
  'description': null,
  'metadata': null,
  'register_number': 16,
  'branch': 'someBranch',
  'custom_ids': null,
  'custom_id': null,
  'configuration': null,
  'client': null,
  'external_custom_id': null,
  'currency_default': null,
  'timezone_default': null,
  'device_configuration': {
    'network': { 'ip': '192.168.13.37' },
    'bundle_id': 'someBundle',
    'device_token': 'someToken'
  },
  'devices': null,
  'branch_number': 1
}
const mockNotification = { aps: { alert: 'Hello, World!' } }
const notificationSuccessMsg = 'Sent notification to 1 device(s).'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v1: Register', () => {
  it('gets the register instance and queries the remote state', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: legacyId
            }
          }
        ]
      })

      mock.onGet(`https://api.tillhub.com/api/v1/Registers/${legacyId}/${mockRegister.id}`).reply(function (config) {
        return [
          200,
          {
            count: 1,
            results: [mockRegister]
          }
        ]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const register = th.register(mockRegister.id)

    expect(register).toBeInstanceOf(v1.Register)

    const { data } = await register.get()

    expect(data).toEqual(mockRegister)
  })

  it('gets the register instance through `registers` and query the remote state', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: legacyId
            }
          }
        ]
      })

      mock.onGet(`https://api.tillhub.com/api/v1/Registers/${legacyId}`).reply(function (config) {
        return [
          200,
          {
            count: 1,
            results: [{}]
          }
        ]
      })

      mock.onGet(`https://api.tillhub.com/api/v1/Registers/${legacyId}/${mockRegister.id}`).reply(function (config) {
        return [
          200,
          {
            count: 1,
            results: [mockRegister]
          }
        ]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const register = th.registers().register(mockRegister.id)

    expect(register).toBeInstanceOf(v1.Register)

    const { data } = await register.get()

    expect(data).toEqual(mockRegister)
  })

  it('sends a notification', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: legacyId
            }
          }
        ]
      })

      mock.onPost(`https://api.tillhub.com/api/v1/Registers/${legacyId}/${mockRegister.id}/notification`, mockNotification).reply(function (config) {
        return [
          200,
          {
            status: 200,
            msg: notificationSuccessMsg
          }
        ]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const register = th.register(mockRegister.id)

    expect(register).toBeInstanceOf(v1.Register)

    const { data } = await register.notify({ aps: { alert: 'Hello, World!' } })

    expect(data).toEqual(notificationSuccessMsg)
  })

  it('updates the device configuration', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: legacyId
            }
          }
        ]
      })

      mock.onPut(`https://api.tillhub.com/api/v1/Registers/${legacyId}/${mockRegister.id}/device_configuration`, mockRegister.device_configuration).reply(function (config) {
        return [
          200,
          {
            count: 1,
            results: [mockRegister]
          }
        ]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const register = th.register(mockRegister.id)

    expect(register).toBeInstanceOf(v1.Register)

    const { data } = await register.deviceConfiguration().update(mockRegister.device_configuration)

    expect(data).toEqual(mockRegister)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: legacyId
            }
          }
        ]
      })

      mock.onGet(`https://api.tillhub.com/api/v1/Registers/${legacyId}/${mockRegister.id}`).reply(function (config) {
        return [404]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.register(mockRegister.id).get()
    } catch (err) {
      expect(err.name).toBe('RegisterFetchFailed')
    }
  })
})
