export class ContextStrategy {
  constructor(strategy) {
    this.strategy = strategy
  }

  create(data) {
    return this.strategy.create(data)
  }

  find(id = null) {
    return this.strategy.list(id)
  }

  update(id, data) {
    return this.strategy.update(id, data)
  }

  delete(id) {
    return this.strategy.delete(id)
  }
}