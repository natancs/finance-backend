import { once } from 'node:events';
import jwt from 'jsonwebtoken'
import { DEFAULT_HEADER, secretKey } from './index.routes.js'
import { ContextStrategy } from '../strategies/context.js';
import { InMemoryStrategy } from '../strategies/InMemoryStrategy.js';
import { inMemoryDB } from '../database/inMemoryDB.js';

class AuthRoute {
  constructor() {
    this.repository = new ContextStrategy(new InMemoryStrategy(inMemoryDB))
  }
  async handler(request, response) {
    const { email, password } = JSON.parse(await once(request, 'data'))
    const user = await this.repository.find(email)

    if (!user) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: "user not found!" }))
      return response.end()
    }

    if (user.email !== email || user.password !== password) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: "email or password invalid!" }))
      return response.end()
    }

    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: "7d"
    })

    response.writeHead(200, DEFAULT_HEADER)
    response.write(JSON.stringify({ id: user.id, token }))
    return response.end()
  }
}

export function authRoute(app) {
  app.post("/login", async (request, response) => {
    new AuthRoute().handler(request, response)
  })

  return app
}