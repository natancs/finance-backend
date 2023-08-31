import http from "../../lib/http2.0.js"

function routesUser(request, response) {
  const routeUser = http()

  routeUser.post("/user", new CreateUser().handler(request, response))

  routeUser.get("/user", new FindUser().handler(request, response))

  routeUser.get("/user/:id", new FindUser().handler(request, response))

  routeUser.put("/user/:id", new UpdateUser().handler(request, response))

  routeUser.delete("/user/:id", new DeleteUser().handler(request, response))

  routeUser.post("/login", new AuthRoute().handler(request, response))
}


export { routesUser }