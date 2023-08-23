import { once } from "node:events"
import { inMemoryDB } from "../database/inMemoryDB.js"
import { DEFAULT_HEADER } from "./index.routes.js"
import { UserEntity } from "../entity/User.js";
import { ContextStrategy } from "../strategies/context.js";
import { InMemoryStrategy } from "../strategies/InMemoryStrategy.js";

export class UpdateUser {
  async handler(request, response) {
    const [, , id] = request.url.split('/')
    const data = JSON.parse(await once(request, 'data'))
    const user = new UserEntity({ id, ...data })

    if (!user._isValid().valid) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: user._isValid().error }))
      return response.end()
    }

    const inMemoryStrategy = new InMemoryStrategy(inMemoryDB)
    const contextStrategy = new ContextStrategy(inMemoryStrategy)
    await contextStrategy.update(id, user)

    response.writeHead(200, DEFAULT_HEADER)
    response.write(JSON.stringify({ message: 'user updated!' }))
    return response.end()
  }
}