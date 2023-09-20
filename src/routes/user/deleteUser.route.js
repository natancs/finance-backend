import { DEFAULT_HEADER } from "../index.routes.js";
import { inMemoryDB } from "../../database/inMemoryDB.js";
import { ContextStrategy } from "../../strategies/context.js";
import { InMemoryStrategy } from "../../strategies/InMemoryStrategy.js";
import { authValidate } from "../../utils/auth-validate.js";

export class DeleteUser {
  async handler(request, response) {
    try {
<<<<<<< HEAD
      const [, , id] = request.url.split('/')
      const inMemoryStrategy = new InMemoryStrategy(inMemoryDB)
      const contextStrategy = new ContextStrategy(inMemoryStrategy)
      const deleteUser = await contextStrategy.delete(id)
      const tokenValid = authValidate(request)

      if (!tokenValid.isValid) {
        throw new Error(tokenValid.message)
      }

      if (!deleteUser) {
        throw new Error("user not found!")
      }

      response.writeHead(200, DEFAULT_HEADER)
      response.write(JSON.stringify({ message: 'user deleted!' }))
      return response.end()
    } catch (error) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: error.message }))
      return response.end()
=======
      const { id } = request.params;
      const inMemoryStrategy = new InMemoryStrategy(inMemoryDB);
      const contextStrategy = new ContextStrategy(inMemoryStrategy);
      const deleteUser = await contextStrategy.delete(id);
      const tokenValid = authValidate(request);

      if (!tokenValid.isValid) {
        throw new Error(tokenValid.message);
      }

      if (!deleteUser) {
        throw new Error("user not found!");
      }

      response.writeHead(200, DEFAULT_HEADER);
      response.write(JSON.stringify({ message: "user deleted!" }));
      return response.end();
    } catch (error) {
      response.writeHead(400, DEFAULT_HEADER);
      response.write(JSON.stringify({ error: error.message }));
      return response.end();
>>>>>>> development
    }
  }
}
