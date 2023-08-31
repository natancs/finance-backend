import http20 from "../lib/http2.0.js";
import { routeUser } from "./user/index.js";

export const DEFAULT_HEADER = {
  'Content-Type': 'application/json'
}
export const secretKey = "0d13cfc865168a5410821988410eebe3"

const routes = http20()

routes.use(routeUser)

export { routes }