import { describe, it } from "node:test"
import assert from "node:assert"
import jwt from 'jsonwebtoken'
import { authValidate } from "../../src/utils/auth-validate.js"
import { secretKey } from "../../src/routes/index.routes.js"

describe("Suite of test unit in authorization token", () => {
  let tokenValid = jwt.sign({ id: "bla" }, secretKey, {
    expiresIn: '7d'
  })
  const request = {
    headers: {
      authorization: undefined
    }
  }

  it('should return a error if token undefined', async () => {
    const token = authValidate(request)
    const expectedBody = { isValid: false, message: 'token invalid!' }

    assert.deepStrictEqual(
      token,
      expectedBody,
      `should return a token invalide and message ${expectedBody.message} but got ${token}`
    )
  })

  it('should return an error if token does not have two parts', async () => {
    const newRequest = {
      ...request,
      headers: {
        authorization: "asaafsgassdasgfdgdaga"
      }
    }
    const token = authValidate(newRequest)
    const expectedBody = { isValid: false, message: 'token invalid!' }

    assert.deepStrictEqual(
      token,
      expectedBody,
      `should return a token invalide and message ${expectedBody.message} but got ${token}`
    )
  })

  it("should return an error if token doesn't start with Bearer", async () => {
    const newRequest = {
      ...request,
      headers: {
        authorization: "asaa fsgassdasgfdgdaga"
      }
    }
    const token = authValidate(newRequest)
    const expectedBody = { isValid: false, message: 'token invalid!' }

    assert.deepStrictEqual(
      token,
      expectedBody,
      `should return a token invalide and message ${expectedBody.message} but got ${token}`
    )
  })

  it("must return validation with true and valid token", async () => {
    const newRequest = {
      ...request,
      headers: {
        authorization: `Bearer ${tokenValid}`
      }
    }
    const token = authValidate(newRequest)
    const expectedBody = { isValid: true, token: tokenValid }

    assert.deepStrictEqual(
      token,
      expectedBody,
      `should return a token invalide and message ${expectedBody.message} but got ${token}`
    )
  })
})