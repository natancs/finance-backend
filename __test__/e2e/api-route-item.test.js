import { describe, before, after, it } from "node:test";
import assert from "node:assert";
import { server } from "../../src/server.js";

describe("Suite of test in route /item", () => {
  let BASE_URL = "";
  let _server = {};
  let USER_ID = "";
  let token;
  let MOCK_ITEM_ID = "";

  before(async () => {
    _server = server;
    _server.listen();

    await new Promise((resolve, rejects) => {
      _server.once("listening", () => {
        const { port } = _server.address();
        BASE_URL = `http://localhost:${port}`;
        console.log(`e2e rodando na ${BASE_URL}/item`);
        resolve();
      });
    });
  });

  before(async () => {
    const result = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      body: JSON.stringify({
        name: "natanael",
        email: "natan@gmail.com",
        password: "teste",
      }),
    });

    const response = await result.json();
    USER_ID = response.id;
    token = response.token;
  });

  after((done) => _server.close(done));

  describe("Suite of test with method POST", () => {
    it("should create a new item and return a message", async () => {
      const input = {
        name: "pão",
        description: "pão",
        price: 5,
        type: "alimento",
        userId: USER_ID,
      };

      const result = await fetch(`${BASE_URL}/item`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const expectedCode = 200;
      const response = await result.json();
      const expectedBody = { id: response.id, message: "new item created!" };

      MOCK_ITEM_ID = response.id;

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`,
      );
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`,
      );
    });

    it("should return a error if any paramters not passed", async () => {
      const input = {
        description: "pão",
        price: 5,
        type: "alimento",
        userId: USER_ID,
      };

      const result = await fetch(`${BASE_URL}/item`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const expectedCode = 400;
      const response = await result.json();
      const expectedBody = { error: "name is missing!" };

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`,
      );
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`,
      );
    });
  });

  describe("Suite of test with method GET", () => {
    it("should find all items by userId", async () => {
      const result = await fetch(`${BASE_URL}/item`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const expectedCode = 200;
      const response = await result.json();

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`,
      );
      assert.ok(
        Array.isArray(response),
        `typeof response should a array, actual: ${typeof response}`,
      );
    });

    it("should find item by id", async () => {
      const result = await fetch(`${BASE_URL}/item/${MOCK_ITEM_ID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const expectedCode = 200;
      const response = await result.json();
      const expectedBody = {
        id: MOCK_ITEM_ID,
        name: "pão",
        description: "pão",
        price: 5,
        type: "alimento",
        userId: USER_ID,
      };

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`,
      );
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedBody}, actual: ${response}`,
      );
    });

    it("should return a error if id not exists", async () => {
      const result = await fetch(`${BASE_URL}/item/2`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const expectedCode = 400;
      const response = await result.json();
      const expectedBody = { error: "item not found!" };

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`,
      );
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`,
      );
    });
  });

  describe("Suite of test with method PUT", () => {
    it("should update a item by id", async () => {
      const input = {
        name: "arroz",
        description: "arroz",
        price: 7,
        type: "alimento",
        userId: USER_ID,
      };
      const result = await fetch(`${BASE_URL}/item/${MOCK_ITEM_ID}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      const expectedCode = 200;
      const response = await result.json();
      const expectedBody = { message: "item updated!" };
      const resultFindItem = await fetch(`${BASE_URL}/item/${MOCK_ITEM_ID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const findItem = await resultFindItem.json();

      const expectedItem = { id: MOCK_ITEM_ID, ...input };

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`,
      );
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`,
      );
      assert.deepStrictEqual(
        findItem,
        expectedItem,
        `user updated should equal ${expectedItem}: actual ${findItem}`,
      );
    });
    it("should return a error if any paramters is invalid", async () => {
      const result = await fetch(`${BASE_URL}/item/${MOCK_ITEM_ID}`, {
        method: "PUT",
        body: JSON.stringify({ name: "arroz", description: "arroz", price: 7 }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const expectedCode = 400;
      const response = await result.json();
      const expectedBody = { error: "type is missing!,userId is missing!" };

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`,
      );
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`,
      );
    });

    it("should return a error if user not exists", async () => {
      const input = {
        name: "arroz",
        description: "arroz",
        price: 7,
        type: "alimento",
        userId: USER_ID,
      };
      const result = await fetch(`${BASE_URL}/item/asdas`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      const expectedCode = 400;
      const response = await result.json();
      const expectedBody = { error: "item not found!" };

      assert.strictEqual(
        result.status,
        expectedCode,
        `status code should be ${expectedCode}, actual: ${result.status}`,
      );
      assert.deepStrictEqual(
        response,
        expectedBody,
        `should return ${expectedCode}, actual: ${result.status}`,
      );
    });
  });

  // describe('Suite of test with method DELETE', () => {
  //   it('should return a error if user not exists', async () => {
  //     const result = await fetch(`${BASE_URL}/user/isiidid`, {
  //       method: "DELETE",
  //       headers: {
  //         "Authorization": `Bearer ${token}`
  //       },
  //     })

  //     const expectedCode = 400
  //     const response = await result.json()
  //     const expectedBody = { error: 'user not found!' }

  //     assert.strictEqual(
  //       result.status,
  //       expectedCode,
  //       `status code should be ${expectedCode}, actual: ${result.status}`
  //     )
  //     assert.deepStrictEqual(
  //       response,
  //       expectedBody,
  //       `should return ${expectedCode}, actual: ${result.status}`
  //     )
  //   })

  //   it('should remove a user by id', async () => {
  //     const result = await fetch(`${BASE_URL}/user/${MOCK_ID}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Authorization": `Bearer ${token}`
  //       },
  //     })

  //     const expectedCode = 200
  //     const response = await result.json()
  //     const expectedBody = { message: 'user deleted!' }

  //     assert.strictEqual(
  //       result.status,
  //       expectedCode,
  //       `status code should be ${expectedCode}, actual: ${result.status}`
  //     )
  //     assert.deepStrictEqual(
  //       response,
  //       expectedBody,
  //       `should return ${expectedCode}, actual: ${result.status}`
  //     )
  //   })
  // })
});
