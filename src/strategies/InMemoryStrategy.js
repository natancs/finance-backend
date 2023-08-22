import { ContextStrategy } from './context.js'

export class InMemoryStrategy extends ContextStrategy {
  constructor(db) {
    super()
    this.db = db
  }

  create(data) {
    return this.db.push(data)
  }

  find(id) {
    const itens = this.db.find(item => item.id === id)

    if (!id) {
      return this.db
    }
  }
}