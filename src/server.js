import http20 from "./lib/http2.0.js"
import { FindUser } from "./routes/user/findUser.route.js"

const app = http20()

function hadlerError(response) {
  return error => {
    console.log("Error", error)
    response.writeHead(500, DEFAULT_HEADER)
    return response.end()
  }
}

app.get("/user", async (request, response) => {
  new FindUser().handler(request, response).catch(hadlerError(response))
})

app.createServer()

export { app }