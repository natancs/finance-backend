class MySimpleExpress {
  constructor() {
    this.routes = [];
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  // ... outras funções e métodos

  handleRequest(req, res) {
    // ... lógica de roteamento

    const executeMiddleware = (index) => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index];
        middleware(req, res, () => {
          executeMiddleware(index + 1);
        });
      } else {
        // Nenhum middleware restante, execute o handler da rota correspondente
        route.handler(req, res);
      }
    };

    executeMiddleware(0);
  }

  // ... outras funções e métodos
}
