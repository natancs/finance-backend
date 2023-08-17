import { once } from "node:events"
import { DEFAULT_HEADER } from "./index.routes.js"
import { UserEntity } from "../entity/User.js";
import { ContextStrategy } from "../strategies/context.js";
import { SQLiteStrategy } from "../strategies/SQLiteStrategy.js";

export class CreateUser {
  async handler(request, response) {
    const data = JSON.parse(await once(request, 'data'))
    const user = new UserEntity(data)

    if (!user._isValid().valid) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: user._isValid().error }))
      return response.end()
    }

    const sqliteStrategy = new SQLiteStrategy("users")
    const contextStrategy = new ContextStrategy(sqliteStrategy)
    await contextStrategy.create(user)

    response.writeHead(201, DEFAULT_HEADER)
    response.write(JSON.stringify({ message: "User created!", id: user.id }))
    return response.end()
  }
}