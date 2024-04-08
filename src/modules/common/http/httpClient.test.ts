import nock from 'nock'
import { HttpClient } from './httpClient'
import axios from 'axios'
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('httpClient', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('Should attach access token to header', (done) => {
    expect.assertions(1)

    const testToken = 'test-token'

    nock('http://pret.com')
      .get('/test')
      .reply(function () {
        expect(this.req.headers.authorization).toBe(`Bearer ${testToken}`)

        done()

        return [200]
      })

    const client = new HttpClient(axios)

    client.attachToken(testToken)

    client.get('http://pret.com/test')
  })
})
