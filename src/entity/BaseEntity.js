import { randomUUID } from 'node:crypto'

export class BaseEntity {
  constructor() {
    this.id = randomUUID()
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