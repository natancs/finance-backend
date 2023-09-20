import http20 from "./lib/http2.0.js"
import { routes } from "./routes/index.routes.js"

const app = http20()

routes(app)

const server = app.createServer()

export { server }