import { once } from 'node:events';
import jwt from 'jsonwebtoken'
import { DEFAULT_HEADER } from './index.routes.js'
import { ContextStrategy } from '../strategies/context.js';
import { InMemoryStrategy } from '../strategies/InMemoryStrategy.js';
import { inMemoryDB } from '../database/inMemoryDB.js';

export class AuthRoute {
  constructor() {
    this.repository = new ContextStrategy(new InMemoryStrategy(inMemoryDB))
  }
  async handler(request, response) {
    const { email, password } = JSON.parse(await once(request, 'data'))
    const user = await this.repository.find


    response.writeHead(200, DEFAULT_HEADER)
    response.write(JSON.stringify({ id: "User created!", token: "token" }))
    return response.end()
  }
}