import { CreateUser } from "./user/createUser.route.js"
import { UpdateUser } from "./user/updateUser.route.js"
import { FindUser } from "./user/findUser.route.js"
import { DeleteUser } from "./user/deleteUser.route.js"
import { AuthRoute } from "./auth.routes.js"

export const DEFAULT_HEADER = {
  'Content-Type': 'application/json'
}

export class Routes {
  static async main(request, response) {
    const { url, method } = request
    const [, route] = url.split('/')

    const key = `/${route}:${method.toLowerCase()}`

    const routes = new this

    const chosen = routes[key] || routes.default

    return chosen(request, response)
  }

  async default(request, response) {
    response.writeHead(200, DEFAULT_HEADER)
    response.write(JSON.stringify({ ping: "pong" }))
    return response.end()
  }

  async "/login:post"(request, response) {
    return new AuthRoute().handler(request, response)
  }

  async "/user:post"(request, response) {
    return new CreateUser().handler(request, response)
  }

  async "/user:get"(request, response) {
    return new FindUser().handler(request, response)
  }

  async "/user:put"(request, response) {
    return new UpdateUser().handler(request, response)
  }

  async "/user:delete"(request, response) {
    return new DeleteUser().handler(request, response)
  }
}