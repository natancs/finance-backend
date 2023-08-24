import { DEFAULT_HEADER } from "./index.routes.js"
import { inMemoryDB } from "../database/inMemoryDB.js"
import { ContextStrategy } from "../strategies/context.js";
import { InMemoryStrategy } from "../strategies/InMemoryStrategy.js";

export class DeleteUser {
  async handler(request, response) {
    const [, , id] = request.url.split('/')
    const inMemoryStrategy = new InMemoryStrategy(inMemoryDB)
    const contextStrategy = new ContextStrategy(inMemoryStrategy)
    const deleteUser = await contextStrategy.delete(id)

    if (!deleteUser) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: "user not found!" }))
      return response.end()
    }

    response.writeHead(200, DEFAULT_HEADER)
    response.write(JSON.stringify({message: 'user deleted!'}))
    return response.end()
  }
}