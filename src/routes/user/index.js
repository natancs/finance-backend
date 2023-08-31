import { CreateUser } from './createUser.route.js'
import { FindUser } from './findUser.route.js'
import { UpdateUser } from './updateUser.route.js'
import { DeleteUser } from './deleteUser.route.js'

function userRoutes(app) {
  app.post("/user", async (request, response) => new CreateUser().handler(request, response))

  app.get("/user", async (request, response) => new FindUser().handler(request, response))

  app.get("/user/:id", async (request, response) => new FindUser().handler(request, response))

  app.put("/user/:id", async (request, response) => new UpdateUser().handler(request, response))

  app.delete("/user/:id", async (request, response) => new DeleteUser().handler(request, response))

  return app
}


export { userRoutes }