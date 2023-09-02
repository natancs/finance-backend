import { CreateItem } from "./createItem.route.js"

export function itemRoutes(app) {
  app.post("/item", async (request, response) => {
    new CreateItem().handler(request, response)
  })

  return app
}