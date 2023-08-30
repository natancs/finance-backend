import http from 'node:http'
import url from 'node:url'

class MyHTTP {
  constructor() {
    this.routes = []
    this.middlewares = []
  }

  get(path, handler) {
    this.routes.push({
      method: "GET",
      path,
      handler
    })
  }

  post(path, handler) {
    this.routes.push({
      method: 'POST',
      path,
      handler
    })
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }


  handleRequest(request, response) {
    try {
      const parsedUrl = url.parse(request.url, true);
      const { pathname, query } = parsedUrl;
      const { method } = request

      const matchingRoutes = this.routes.filter(route => {
        const pathRegex = new RegExp(`^${route.path.replace(/:\w+/g, '([\\w-]+)')}$`)
        return route.method === method && pathRegex.test(pathname)
      })

      if (matchingRoutes.length === 0) {
        response.statusCode = 404
        return response.end('Not Found!')
      }

      request.params = {}
      const route = matchingRoutes[0]
      const paramNames = route.path.match(/:\w+/g) || []
      const matches = pathname.match(new RegExp(route.path.replace(/:\w+/g, '([\\w-]+)')))
      paramNames.forEach((param, index) => {
        request.params[param.substring(1)] = matches[index + 1]
      })

      request.query = query

      const next = () => {
        const middleware = this.middlewares.shift()
        if (middleware) {
          middleware(request, response, next)
        } else {
          route.handler(request, response)
        }
      }

      next()
    } catch (error) {
      console.log("Error", error)
      response.statusCode = 500
      return response.end()
    }
  }

  createServer() {
    const server = http.createServer(this.handleRequest.bind(this));
    return server
  }

  listen(port, callback) {
    const server = this.createServer()
    server.listen(port, callback);
  }
}

export default () => { return new MyHTTP() }