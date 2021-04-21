import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'
const searchTerm = 'asdf'
const query = {
  q: searchTerm,
  fields: ['register_number']
}
const queryString = qs.stringify(query, { addQueryPrefix: true })

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v1: Registers: can search for register', () => {
  it('receives a search query of type string', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => [
        200,
        {
          token: '',
          user: {
            id: '123',
            legacy_id: legacyId
          }
        }
      ])

      mock
        .onGet(`https://api.tillhub.com/api/v1/registers/${legacyId}/search?q=${searchTerm}`)
        .reply(() => [
          200,
          {
            count: 1,
            results: [{}]
          }
        ])
    }

    const th = await initThInstance()

    const registers = th.registers()

    expect(registers).toBeInstanceOf(v1.Registers)

    const { data } = await registers.search(searchTerm)

    expect(Array.isArray(data)).toBe(true)
  })

  it('receives a search query of type object', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
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
        .onGet(`https://api.tillhub.com/api/v1/registers/${legacyId}/search${queryString}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [{}]
            }
          ]
        })
    }

    const th = await initThInstance()

    const registers = th.registers()

    expect(registers).toBeInstanceOf(v1.Registers)

    const { data } = await registers.search(query)

    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => [
        200,
        {
          token: '',
          user: {
            id: '123',
            legacy_id: legacyId
          }
        }
      ])

      mock
        .onGet(`https://api.tillhub.com/api/v1/registers/${legacyId}/search?q=${searchTerm}`)
        .reply(() => [205])
    }

    const th = await initThInstance()

    try {
      await th.registers().search(searchTerm)
    } catch (err) {
      expect(err.name).toBe('RegistersSearchFailed')
    }
  })
})
