import { ContextStrategy } from "./context.js";

export class InMemoryStrategy extends ContextStrategy {
  constructor(db) {
    super();
    this.db = db;
  }

  #findKeyForValue(object, value) {
    for (let key in object) {
      if (object[key] === value) return key;
    }

    return null;
  }

  create(data) {
    this.db.push(data);
    return data;
  }

  find(where) {
    let result = [];

    if (where) {
      result = this.db.filter(
        (item) => item[this.#findKeyForValue(item, where)] === where,
      );

      if (result.length === 1) result = result[0];
      if (result.length === 0) {
        result = false;
      }
    } else result = this.db;

    return result;
  }

  update(id, data) {
    const findItem = this.find(id);
    const index = this.db.findIndex((item) => item === findItem);

    if (!findItem) {
      return false;
    }

    this.db.splice(index, 1, data);

    return true;
  }

  delete(id) {
    const findItem = this.find(id);

    if (!findItem) {
      return false;
    }

    this.db.splice(this.db[findItem], 1);

    return true;
  }
}
