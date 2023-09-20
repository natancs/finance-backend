import jwt from 'jsonwebtoken'
import { secretKey } from '../routes/index.routes.js'

export function authValidate(request) {
  try {
    const authentication = request.headers.authorization

    if (authentication === undefined) {
      throw new Error('token invalid!')
    }
    const [bearer, token] = authentication.split(' ')

    if (authentication.split(' ').length !== 2) {
      throw new Error('token invalid!')
    }

    if (bearer !== "Bearer") {
      throw new Error('token invalid!')
    }

    // if there is an error, it already plays for catch
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        throw new Error('Failed to authenticate token.')
      }
      request.userId = decoded.id
    })

    return {
      isValid: true,
      token
    }
  } catch (error) {
    return { isValid: false, message: error.message }
  }

}