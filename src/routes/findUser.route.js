import { DEFAULT_HEADER } from "./index.routes.js"
import {inMemoryDB} from "../database/inMemoryDB.js"
import { ContextStrategy } from "../strategies/context.js";
import { InMemoryStrategy } from "../strategies/InMemoryStrategy.js";

export class FindUser {
  async handler(request, response) {
    const [,,id] = request.url.split('/')


    // if (!user._isValid().valid) {
    //   response.writeHead(400, DEFAULT_HEADER)
    //   response.write(JSON.stringify({ error: user._isValid().error }))
    //   return response.end()
    // }

    const inMemoryStrategy = new InMemoryStrategy(inMemoryDB)
    const contextStrategy = new ContextStrategy(inMemoryStrategy)
    const findUser = await contextStrategy.find(id)

    response.writeHead(200, DEFAULT_HEADER)
    response.write(JSON.stringify(findUser))
    return response.end()
  }
}