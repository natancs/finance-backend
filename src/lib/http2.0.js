import http from 'http'
import url from 'url'

class MyHTTP {
  constructor() {
    this.routes = {};
  }

  get(path, handler) {
    this.routes[path] = handler;
  }

  use(middleware) {
    this.middleware = middleware;
  }

  async handleRequest(request, response) {
    try {
      const parsedUrl = url.parse(request.url, true);
      const { pathname } = parsedUrl;

      const handler = this.routes[pathname];
      if (!handler) {
        response.statusCode = 404;
        response.end('Not Found');
        return;
      }

      if (this.middleware) {
        this.middleware(request, response, () => {
          handler(request, response);
        });
      } else {
        handler(request, response);
      }
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