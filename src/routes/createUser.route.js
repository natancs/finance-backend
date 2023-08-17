import { once } from "node:events"
import { DEFAULT_HEADER } from "./index.routes.js"
import { UserRepository } from '../repository/UserRepository.js';
import { UserEntity } from "../entity/User.js";

export class CreateUser {
  constructor() {
    this.userRepository = new UserRepository()
  }

  async handler(request, response) {
    const data = JSON.parse(await once(request, 'data'))
    const user = new UserEntity(data)

    if (!user._isValid().valid) {
      response.writeHead(400, DEFAULT_HEADER)
      response.write(JSON.stringify({ error: user._isValid().error }))
      return response.end()
    }

    await this.userRepository.create(user)

    response.writeHead(201, DEFAULT_HEADER)
    response.write(JSON.stringify({ message: "User created!", id: user.id }))
    return response.end()
  }
}