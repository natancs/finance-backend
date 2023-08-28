import { once } from "node:events"
import { inMemoryDB } from "../../database/inMemoryDB.js"
import { DEFAULT_HEADER } from "../index.routes.js"
import { UserEntity } from "../../entity/User.js";
import { ContextStrategy } from "../../strategies/context.js";
import { InMemoryStrategy } from "../../strategies/InMemoryStrategy.js";
import { authValidate } from "../../utils/auth-validate.js";

export class UpdateUser {
  async handler(request, response) {
    const [, , id] = request.url.split('/')
    const data = JSON.parse(await once(request, 'data'))
    const user = new UserEntity({ id, ...data })
    const tokenValid = authValidate(request)

    if (!tokenValid.isValid) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: tokenValid.message }))
      return response.end()
    }

    if (!user._isValid().valid) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: user._isValid().error }))
      return response.end()
    }

    const inMemoryStrategy = new InMemoryStrategy(inMemoryDB)
    const contextStrategy = new ContextStrategy(inMemoryStrategy)
    const updatedUser = await contextStrategy.update(id, user)
    if (!updatedUser) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: 'user not found!' }))
      return response.end()
    }

    response.writeHead(200, DEFAULT_HEADER)
    response.write(JSON.stringify({ message: 'user updated!' }))
    return response.end()
  }
}