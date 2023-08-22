import { ContextStrategy } from './context.js'

export class InMemoryStrategy extends ContextStrategy {
  constructor(db) {
    super()
    this.db = db
  }

  create(data) {
    this.db.push(data)
    return data
  }

  find(id) {
    let result = ''

    if (id) {
      result = this.db.find(item => item.id === id)
      if (result === undefined) {
        result = "user not found!"
      }
    } else (
      result = this.db
    )

    return result
  }
}