import { createServer } from "node:http"
import { DEFAULT_HEADER, Routes } from "./routes/index.routes.js"

function hadlerError(response) {
  return error => {
    console.log("Error", error)
    response.writeHead(500, DEFAULT_HEADER)
    return response.end()
  }
}

function handler(request, response) {
  Routes.main(request, response).catch(hadlerError(response))
}

const app = createServer(handler)

export { app }