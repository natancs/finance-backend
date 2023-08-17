import { ContextStrategy } from "./context.js";
import { knexDB } from '../database/index.js';

export class SQLiteStrategy extends ContextStrategy {
  constructor(dbName) {
    super()
    this.dbName = dbName
  }

  async create(data) {
    await knexDB(this.dbName).insert(data)
  }
}