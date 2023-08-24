import { describe, before, it, after } from 'node:test'
import { app } from '../../src/server.js'

describe("API Suite of test in route /login", () => {
  let BASE_URL = ''
  let _server = {}

  before(async () => {
    _server = app
    _server.listen()

    await new Promise((resolve, reject) => {
      _server.once('listening', () => {
        const { port } = _server.address()
        BASE_URL = `http://localhost:${port}`
        console.log('e2e rodando na ', BASE_URL)
        resolve()
      })
    })
  })

  after((done) => _server.close(done))
})
