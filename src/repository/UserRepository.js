import { knexDB } from '../database/index.js';

export class UserRepository {
  async create({ id, name, email, password }) {
    await knexDB('users').insert({ id, name, email, password })
  }
}