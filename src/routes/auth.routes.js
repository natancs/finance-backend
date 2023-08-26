import { once } from 'node:events';
import jwt from 'jsonwebtoken'
import { DEFAULT_HEADER } from './index.routes.js'

export class AuthRoute {
  constructor() {
    this.repository = ''
  }
  async handler(request, response) {
    const { email, password } = JSON.parse(await once(request, 'data'))


    response.writeHead(200, DEFAULT_HEADER)
    response.write(JSON.stringify({ id: "User created!", token: "token" }))
    return response.end()
  }
}