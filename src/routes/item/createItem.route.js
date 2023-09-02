import { once } from 'node:events'
import { inMemoryDB } from "../../database/inMemoryDB.js"
import { InMemoryStrategy } from "../../strategies/InMemoryStrategy.js"
import { ContextStrategy } from "../../strategies/context.js"
import { DEFAULT_HEADER } from "../index.routes.js"
import { authValidate } from '../../utils/auth-validate.js'
import { Item } from '../../entity/Item.js'

export class CreateItem {
  constructor() {
    this.contextStrategy = new ContextStrategy(new InMemoryStrategy(inMemoryDB))
  }
  async handler(request, response) {
    try {
      authValidate(request)
      const userId = request.userId
      const data = JSON.parse(await once(request, 'data'))
      const item = new Item({ ...data, userId })

      if (!item._isValid().valid) {
        throw new Error(item._isValid().error)
      }
      await this.contextStrategy.create(item)

      response.writeHead(200, DEFAULT_HEADER)
      response.write(JSON.stringify({ message: "new item created!" }))
      return response.end()
    } catch (error) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: error.message }))
      return response.end()
    }
  }
}