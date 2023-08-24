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
        result = false
      }
    } else (
      result = this.db
    )

    return result
  }

  update(id, data) {
    const findItem = this.find(id)

    if (!findItem) {
      return false
    }

    this.db.splice(this.db[findItem], 1, data)

    return true
  }

  delete(id) {
    const findItem = this.find(id)

    if (!findItem) {
      return false
    }

    this.db.splice(this.db[findItem], 1)

    return true
  }
}