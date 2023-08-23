import { BaseEntity } from './BaseEntity.js'
export class UserEntity extends BaseEntity {
  constructor({ id, name, email, password }) {
    super()
    this.name = name
    this.email = email
    this.password = password

    if (id) {
      this.id = id
    }
  }
}