import { describe, before, it, after } from 'node:test'
import assert from 'node:assert'
import { app } from '../../src/server.js'

describe("API Suite of test in route /login", () => {
  let BASE_URL = ''
  let _server = {}
  const MOCK_USER = {
    name: "natanael",
    email: "natan@gmail.com",
    password: "teste"
  }
  let MOCK_ID = ''

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

  before(async () => {
    const request = await fetch(`${BASE_URL}/user`, {
      method: 'POST',
      body: JSON.stringify(MOCK_USER)
    })

    const response = await request.json()
    MOCK_ID = response.id
  })

  after((done) => _server.close(done))

  it('sould return the token jwt if authenticated in route /login', async () => {
    const input = {
      email: MOCK_USER.email,
      password: MOCK_USER.password
    }
    const result = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(input)
    })

    const expectedCode = 200
    const response = await result.json()
    const expectedBody = { id: MOCK_ID, token: response.token }

    assert.strictEqual(
      result.status,
      expectedCode,
      `Expected status code ${expectedCode} but got ${result.status}`
    )
    assert.deepStrictEqual(
      response,
      expectedBody,
      `Expected response body ${expectedBody} but got ${response}`
    )
  })

  it('sould return a error if user not exists', async () => {
    const input = {
      email: "MOCK_USER.email",
      password: MOCK_USER.password
    }
    const result = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(input)
    })

    const expectedCode = 400
    const response = await result.json()
    const expectedBody = { error: "user not found!" }

    assert.strictEqual(
      result.status,
      expectedCode,
      `Expected status code ${expectedCode} but got ${result.status}`
    )
    assert.deepStrictEqual(
      response,
      expectedBody,
      `Expected response body ${expectedBody} but got ${response}`
    )
  })

  it('sould return a error if email or password invalid', async () => {
    const input = {
      email: MOCK_USER.email,
      password: "invalid"
    }
    const result = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(input)
    })

    const expectedCode = 400
    const response = await result.json()
    const expectedBody = { error: "email or password invalid!" }

    assert.strictEqual(
      result.status,
      expectedCode,
      `Expected status code ${expectedCode} but got ${result.status}`
    )
    assert.deepStrictEqual(
      response,
      expectedBody,
      `Expected response body ${expectedBody} but got ${response}`
    )
  })
})
