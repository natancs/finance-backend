import { once } from "node:events"
import { inMemoryDB } from "../../database/inMemoryDB.js"
import { DEFAULT_HEADER } from "../index.routes.js"
import { UserEntity } from "../../entity/User.js";
import { ContextStrategy } from "../../strategies/context.js";
import { InMemoryStrategy } from "../../strategies/InMemoryStrategy.js";
import { authValidate } from "../../utils/auth-validate.js";

export class UpdateUser {
  async handler(request, response) {
    try {
      const [, , id] = request.url.split('/')
      const data = JSON.parse(await once(request, 'data'))
      const user = new UserEntity({ id, ...data })
      const tokenValid = authValidate(request)

      if (!tokenValid.isValid) {
        throw new Error(tokenValid.message)
      }

      if (!user._isValid().valid) {
        throw new Error(user._isValid().error)
      }

      const inMemoryStrategy = new InMemoryStrategy(inMemoryDB)
      const contextStrategy = new ContextStrategy(inMemoryStrategy)
      const updatedUser = await contextStrategy.update(id, user)
      if (!updatedUser) {
        throw new Error('user not found!')
      }

      response.writeHead(200, DEFAULT_HEADER)
      response.write(JSON.stringify({ message: 'user updated!' }))
      return response.end()
    } catch (error) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: error.message }))
      return response.end()
    }
  }
}