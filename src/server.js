import http20 from "./lib/http2.0.js"
// import { routes } from "./routes/index.routes.js"
import { routesUser } from "./routes/user/index.js"

const app = http20()

app.use((request, response, next) => {
  routesUser(request, response)
  next()
})

const server = app.createServer()

export { server }