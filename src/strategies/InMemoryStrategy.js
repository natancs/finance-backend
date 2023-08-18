import { ContextStrategy } from './context.js'

export class InMemoryStrategy extends ContextStrategy {
  constructor() {
    super()
    this.db = []
  }

  create(data) {
    return this.db.push(data)
  }
}