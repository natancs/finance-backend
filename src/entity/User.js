import { randomUUID } from 'node:crypto'
export class UserEntity {
  constructor({ name, email, password }) {
    this.id = randomUUID()
    this.name = name
    this.email = email
    this.password = password
  }

  _isValid() {
    const propertyName = Object.getOwnPropertyNames(this)
    const amountInvalid = propertyName
      .map(property => (!!this[property]) ? null : `${property} is missing!`) //!!this transforma numa propriedade boleana, se tiver vazio retorna false do contrario retorna true
      .filter(item => !!item) // vai retornar apenas os que não tiverem null ou undefined

    return {
      valid: amountInvalid.length === 0,
      error: amountInvalid
    }
  }
}