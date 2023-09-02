import { CreateItem } from "./createItem.route.js"
import { FindItem } from "./findItem.route.js"

export function itemRoutes(app) {
  app.post("/item", async (request, response) => {
    new CreateItem().handler(request, response)
  })

  app.get("/item", async (request, response) => {
    new FindItem().handler(request, response)
  })

  return app
}