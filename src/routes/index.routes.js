import { CreateUser } from "./createUser.route.js"

export const DEFAULT_HEADER = {
  'Content-Type': 'application/json'
}

export class Routes {
  static async main(request, response) {
    const { url, method } = request
    const [, route, id] = url.split('/')
    request.queryString = { id: !id ? id : id.replace(/["]/g, '') }

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

  async "/user:post"(request, response) {
    return new CreateUser().handler(request, response)
  }
}