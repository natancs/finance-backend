import http20 from "./lib/http2.0.js"
import { CreateUser } from "./routes/user/createUser.route.js"
import { FindUser } from "./routes/user/findUser.route.js"

const app = http20()

function hadlerError(response) {
  return error => {
    console.log("Error", error)
    response.writeHead(500, DEFAULT_HEADER)
    return response.end()
  }
}


app.post("/user", async (request, response) => {
  new CreateUser().handler(request, response).catch(hadlerError(response))
})

app.get("/user", async (request, response) => {
  new FindUser().handler(request, response).catch(hadlerError(response))
})

app.get("/user/:id", async (request, response) => {
  new FindUser().handler(request, response).catch(hadlerError(response))
})

const server = app.createServer()

export { server }