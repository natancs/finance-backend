import { once } from "node:events"
import jwt from 'jsonwebtoken'
import { inMemoryDB } from "../../database/inMemoryDB.js"
import { DEFAULT_HEADER, secretKey } from "../index.routes.js"
import { UserEntity } from "../../entity/User.js";
import { ContextStrategy } from "../../strategies/context.js";
import { InMemoryStrategy } from "../../strategies/InMemoryStrategy.js";

export class CreateUser {
  async handler(request, response) {
    try {
      const data = JSON.parse(await once(request, 'data'))
      const user = new UserEntity(data)

      if (!user._isValid().valid) {
        throw new Error(user._isValid().error)
      }

      const inMemoryStrategy = new InMemoryStrategy(inMemoryDB)
      const contextStrategy = new ContextStrategy(inMemoryStrategy)
      await contextStrategy.create(user)
      const token = jwt.sign({ id: user.id }, secretKey, {
        expiresIn: "7d"
      })

      response.writeHead(201, DEFAULT_HEADER)
      response.write(JSON.stringify({ message: "User created!", id: user.id, token }))
      return response.end()
    } catch (error) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: error.message }))
      return response.end()
    }
  }
}