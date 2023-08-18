import { describe, it, before, after } from "node:test"
import assert from "node:assert"
import { app } from "../../src/server.js"

describe("API Suit of Test in route /user method POST", () => {
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

  it('should find all users', async () => {
    const result = await fetch(`${BASE_URL}/user`, {
      method: "GET",
    })
    // const expectedCode = 201
    // const response = await result.json()
    // const expectedBody = { message: "User created!", id: response.id }

    // assert.strictEqual(
    //   result.status,
    //   expectedCode,
    //   `status code should be ${expectedCode}, actual: ${result.status}`
    // )
    // assert.deepStrictEqual(
    //   response,
    //   expectedBody,
    //   `should return ${expectedCode}, actual: ${result.status}`
    // )
  })

  it('should find user by id', async () => {
    // const input = {
    //   email: "natan@gmail.com",
    //   password: "teste"
    // }

    // const result = await fetch(`${BASE_URL}/user`, {
    //   method: "POST",
    //   body: JSON.stringify(input)
    // })
    // const expectedCode = 400
    // const response = await result.json()
    // const expectedBody = { error: ["name is missing!"] }

    // assert.strictEqual(
    //   result.status,
    //   expectedCode,
    //   `status code should be ${expectedCode}, actual: ${result.status}`
    // )
    // assert.deepStrictEqual(
    //   response,
    //   expectedBody,
    //   `should return ${expectedCode}, actual: ${result.status}`
    // )
  })
})