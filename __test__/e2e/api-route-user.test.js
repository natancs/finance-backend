import { describe, it, before, after } from "node:test"
import assert from "node:assert"
import { app } from "../../src/server.js"

describe("API Suite of Test in route /user", () => {
  let BASE_URL = ''
  let _server = {}
  let MOCK_ID = ''
  const MOCK_UPDATED_USER = {
    name: "natanael",
    email: "natan@gmail.com",
    password: "<PASSWORD>"
  }

  let token = ""

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
    const input = {
      name: "natanael",
      email: "natan@gmail.com",
      password: "teste"
    }

    const result = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      body: JSON.stringify(input)
    })
    const response = await result.json()
    token = response.token
    MOCK_ID = response.id
  })

  after((done) => {
    _server.close(done)
  })

  describe('Suite of test with method POST', () => {
    it('should create a user and return message and id and token', async () => {
      const input = {
        name: "natanael",
        email: "natan@gmail.com",
        password: "teste"
      }

      const result = await fetch(`${BASE_URL}/user`, {
        method: "POST",
        body: JSON.stringify(input)
      })
      const expectedCode = 201
      const response = await result.json()
      const expectedBody = { message: "User created!", id: response.id, token: response.token }

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`
      )
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`
      )
    })

    it('should return a error if any paramters not passed', async () => {
      const input = {
        email: "natan@gmail.com",
        password: "teste"
      }

      const result = await fetch(`${BASE_URL}/user`, {
        method: "POST",
        body: JSON.stringify(input)
      })
      const expectedCode = 400
      const response = await result.json()
      const expectedBody = { error: ["name is missing!"] }

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`
      )
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`
      )
    })
  })

  describe('Suite of test with method GET', () => {
    it('should find all users', async () => {
      const result = await fetch(`${BASE_URL}/user`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const expectedCode = 200
      const response = await result.json()

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`
      )
      assert.ok(
        Array.isArray(response),
        `typeof response should a array, actual: ${typeof response}`
      )
    })

    it('should find user by id', async () => {
      const result = await fetch(`${BASE_URL}/user/${MOCK_ID}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })
      const expectedCode = 200
      const response = await result.json()
      const expectedBody = { id: MOCK_ID, ...response }

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`
      )
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`
      )
    })

    it('should return a error if id not exists', async () => {
      const result = await fetch(`${BASE_URL}/user/2`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })
      const expectedCode = 400
      const response = await result.json()
      const expectedBody = { error: "user not found!" }

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`
      )
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`
      )
    })
  })

  describe('Suite of test with method PUT', () => {
    it('should update a user by id', async () => {
      const result = await fetch(`${BASE_URL}/user/${MOCK_ID}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(MOCK_UPDATED_USER),
      })

      const expectedCode = 200
      const response = await result.json()
      const expectedBody = { message: "user updated!" }
      const resultFindUser = await fetch(`${BASE_URL}/user/${MOCK_ID}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const findUser = await resultFindUser.json()

      const expectedUser = { id: MOCK_ID, ...MOCK_UPDATED_USER }

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`
      )
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`
      )
      assert.deepStrictEqual(
        findUser,
        expectedUser,
        `user updated should equal ${expectedUser}: actual ${findUser}`
      )
    })
    it('should return a error if any paramters is invalid', async () => {
      const result = await fetch(`${BASE_URL}/user/${MOCK_ID}`, {
        method: "PUT",
        body: JSON.stringify({ name: 'test', email: 'test@gmail.com' }), headers: {
          "Authorization": `Bearer ${token}`
        },
      })

      const expectedCode = 400
      const response = await result.json()
      const expectedBody = { error: ['password is missing!'] }

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`
      )
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`
      )
    })

    it('should return a error if user not exists', async () => {
      const result = await fetch(`${BASE_URL}/user/asdas`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(MOCK_UPDATED_USER)
      })

      const expectedCode = 400
      const response = await result.json()
      const expectedBody = { error: 'user not found!' }

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`
      )
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`
      )
    })
  })

  describe('Suite of test with method DELETE', () => {
    it('should return a error if user not exists', async () => {
      const result = await fetch(`${BASE_URL}/user/isiidid`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })

      const expectedCode = 400
      const response = await result.json()
      const expectedBody = { error: 'user not found!' }

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`
      )
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`
      )
    })

    it('should remove a user by id', async () => {
      const result = await fetch(`${BASE_URL}/user/${MOCK_ID}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })

      const expectedCode = 200
      const response = await result.json()
      const expectedBody = { message: 'user deleted!' }

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`
      )
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`
      )
    })
  })
})