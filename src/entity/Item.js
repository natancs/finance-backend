import { BaseEntity } from "./BaseEntity.js";

export class Item extends BaseEntity {
  constructor({ id, name, description, price, type, userId }) {
    super()
    this.name = name
    this.description = description
    this.price = price
    this.type = type
    this.userId = userId

    if (id) {
      this.id = id
    }
  }
}

// - id
//     - name
//     - description
//     - price
//     - type
//     - userId
