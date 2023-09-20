import { CreateItem } from "./createItem.route.js";
import { FindItem } from "./findItem.route.js";
import { UpdateItem } from "./updateItem.route.js";
import { DeleteItem } from "./removeItem.route.js";

export function itemRoutes(app) {
  app.post("/item", async (request, response) => {
    new CreateItem().handler(request, response);
  });

  app.get("/item", async (request, response) => {
    new FindItem().handler(request, response);
  });
  app.get("/item/:id", async (request, response) => {
    new FindItem().handler(request, response);
  });

  app.put("/item/:id", async (request, response) => {
    new UpdateItem().handler(request, response);
  });

  app.delete("/item/:id", async (request, response) => {
    new DeleteItem().handler(request, response);
  });

  return app;
}
