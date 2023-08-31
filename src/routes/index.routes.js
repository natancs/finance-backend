import { authRoute } from "./auth.routes.js";
import { userRoutes } from "./user/index.js";

export const DEFAULT_HEADER = {
  'Content-Type': 'application/json'
}
export const secretKey = "0d13cfc865168a5410821988410eebe3"

function routes(app) {
  userRoutes(app)
  authRoute(app)

  return app
}

export { routes }