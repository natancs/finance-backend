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
      const { id } = request.params
      authValidate(request)
      const userId = request.userId
      const findItem = this.contextStrategy.find(userId)

      if (!findItem) {
        throw new Error("user not found!")
      }

      let items = findItem.filter(item => item.userId === userId)

      if (id) {
        items = this.contextStrategy.find(id)

        if (!items) {
          throw new Error("item not found!")
        }
      }

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