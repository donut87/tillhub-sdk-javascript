import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { Pricebooks } from './../../src/v1/pricebooks'
import { initThInstance } from '../util'

const legacyId = '4564'

describe('v0: Pricebooks: can get count number of all pricebooks', () => {
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })
  it("Tillhub's staff groups are instantiable", async () => {
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

      mock
        .onGet(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/meta`)
        .reply(function (config) {
          return [
            200,
            {
              count: 50,
              results: [{ count: 50 }]
            }
          ]
        })
    }

    const th = await initThInstance()

    const pricebooks = th.products().pricebooks()

    expect(pricebooks).toBeInstanceOf(Pricebooks)

    const { data } = await pricebooks.meta()

    expect(data).toEqual([{ count: 50 }])
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

      mock
        .onGet(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/meta`)
        .reply(function (config) {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.products().pricebooks().meta()
    } catch (err) {
      expect(err.name).toBe('PricebooksMetaFailed')
    }
  })
})
