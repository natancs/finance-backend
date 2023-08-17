import { describe, it, before, after } from "node:test"
import assert from "node:assert"
import { app } from "../../src/server.js"

describe("API Suit of Test in route /user method GET", () => {
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

  after((done) => {
    _server.close(done)
  })

  it('should list all users', async () => {
    const result = await fetch(`${BASE_URL}/user`, {
      method: "GET"
    })
    const expectedCode = 200
    const response = await result.json()

    assert.strictEqual(
      result.status,
      expectedCode,
      `status code should be ${expectedCode}, actual: ${result.status}`
    )
    assert.ok(Array.isArray(response),
      `should return ${expectedCode}, actual: ${result.status}`
    )
  })

  it('should return a error if any paramters not passed', async () => {

  })
})