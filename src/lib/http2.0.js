import http from 'node:http'
import url from 'node:url'
import { DEFAULT_HEADER } from '../routes/index.routes.js'

class MyHTTP {
  constructor() {
    this.routes = []
    this.middlewares = []
  }

  get(path, handlerRoute) {
    this.routes.push({
      method: "GET",
      path,
      async handler(request, response) {
        return await handlerRoute(request, response)
      }
    })
  }

  post(path, handlerRoute) {
    this.routes.push({
      method: 'POST',
      path,
      async handler(request, response) {
        return await handlerRoute(request, response)
      }
    })
  }

  put(path, handlerRoute) {
    this.routes.push({
      method: "PUT",
      path,
      async handler(request, response) {
        return await handlerRoute(request, response)
      }
    })
  }

  delete(path, handlerRoute) {
    this.routes.push({
      method: "DELETE",
      path,
      async handler(request, response) {
        return await handlerRoute(request, response)
      }
    })
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }

  next(index, request, response, route) {
    if (index < this.middlewares.length) {
      const middleware = this.middlewares[index]
      middleware(request, response, () => {
        this.next(index + 1, request, response, route)
      }).catch(this.handlerError(response))
    } else {
      route.handler(request, response).catch(this.handlerError(response))
    }
  }

  handlerError(response) {
    return error => {
      console.log("Error", error)
      response.writeHead(500, DEFAULT_HEADER)
      return response.end()
    }
  }

  handleRequest(request, response) {
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

    this.next(0, request, response, route)
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