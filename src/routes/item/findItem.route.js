import { inMemoryDB } from "../../database/inMemoryDB.js"
import { InMemoryStrategy } from "../../strategies/InMemoryStrategy.js"
import { ContextStrategy } from "../../strategies/context.js"
import { DEFAULT_HEADER } from "../index.routes.js"
import { authValidate } from '../../utils/auth-validate.js'

export class FindItem {
  constructor() {
    this.contextStrategy = new ContextStrategy(new InMemoryStrategy(inMemoryDB))
  }
  async handler(request, response) {
    try {
      authValidate(request)
      const userId = request.userId
      const findItem = this.contextStrategy.find(userId)

      if (!findItem) {
        throw new Error("user not found!")
      }

      const items = findItem.filter(item => item.userId === userId)

      response.writeHead(200, DEFAULT_HEADER)
      response.write(JSON.stringify(items))
      return response.end()
    } catch (error) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: error.message }))
      return response.end()
    }
  }
}