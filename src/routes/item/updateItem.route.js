import { once } from "node:events";
import { inMemoryDB } from "../../database/inMemoryDB.js";
import { DEFAULT_HEADER } from "../index.routes.js";
import { ContextStrategy } from "../../strategies/context.js";
import { InMemoryStrategy } from "../../strategies/InMemoryStrategy.js";
import { Item } from "../../entity/Item.js";

export class UpdateItem {
  constructor() {
    this.repository = new ContextStrategy(new InMemoryStrategy(inMemoryDB));
  }
  async handler(request, response) {
    try {
      const userId = request.userId;
      const { id } = request.params;
      const data = JSON.parse(await once(request, "data"));
      const item = new Item({ id, userId, ...data });

      if (!item._isValid().valid) {
        throw new Error(item._isValid().error);
      }

      const updateItem = await this.repository.update(id, item);
      if (!updateItem) {
        throw new Error("item not found!");
      }

      response.writeHead(200, DEFAULT_HEADER);
      response.write(JSON.stringify({ message: "item updated!" }));
      return response.end();
    } catch (error) {
      response.writeHead(400, DEFAULT_HEADER);
      response.write(JSON.stringify({ error: error.message }));
      return response.end();
    }
  }
}
