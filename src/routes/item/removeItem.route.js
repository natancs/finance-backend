import { DEFAULT_HEADER } from "../index.routes.js";
import { inMemoryDB } from "../../database/inMemoryDB.js";
import { ContextStrategy } from "../../strategies/context.js";
import { InMemoryStrategy } from "../../strategies/InMemoryStrategy.js";

export class DeleteItem {
  async handler(request, response) {
    try {
      const { id } = request.params;
      const inMemoryStrategy = new InMemoryStrategy(inMemoryDB);
      const contextStrategy = new ContextStrategy(inMemoryStrategy);
      const deleteItem = await contextStrategy.delete(id);

      if (!deleteItem) {
        response.writeHead(400, DEFAULT_HEADER);
        response.write(JSON.stringify({ error: "item not found!" }));
        return response.end();
      }

      response.writeHead(200, DEFAULT_HEADER);
      response.write(JSON.stringify({ message: "item deleted!" }));
      return response.end();
    } catch (error) {
      response.writeHead(400, DEFAULT_HEADER);
      response.write(JSON.stringify({ error: error.message }));
      return response.end();
    }
  }
}
