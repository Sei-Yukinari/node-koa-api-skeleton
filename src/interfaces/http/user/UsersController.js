import Router from 'koa-router';
import Status from 'http-status';

const UsersController = {
  get router() {
    const router = new Router();

    router.get('/', this.index);
    router.get('/:id', this.show);
    router.post('/', this.create);
    router.put('/:id', this.update);
    router.delete('/:id', this.delete);

    return router.routes();
  },

  async index(ctx, next) {
    const userService = ctx.scope.resolve('userService');
    const { SUCCESS, ERROR } = userService.outputs;
    userService
      .on(SUCCESS, (users) => {
        ctx.body = users;
        ctx.status = Status.OK;
      })
      .on(ERROR, (error) => {
        ctx.error = error;
        next();
      });
    await userService.getAllUsers();
  },

  async show(ctx, next) {
    const userService = ctx.scope.resolve('userService');
    const { SUCCESS, NOT_FOUND, ERROR } = userService.outputs;
    userService
      .on(SUCCESS, (users) => {
        ctx.body = users;
        ctx.status = Status.OK;
      })
      .on(NOT_FOUND, (error) => {
        ctx.body = {
          type: 'NotFoundError',
          details: error.details,
        };
        ctx.status = Status.NOT_FOUND;
      })
      .on(ERROR, next);
    await userService.getUser(Number(ctx.params.id));
  },

  async create(ctx, next) {
    const userService = ctx.scope.resolve('userService');
    const { SUCCESS, ERROR, VALIDATION_ERROR } = userService.outputs;
    userService
      .on(SUCCESS, (users) => {
        ctx.body = users;
        ctx.status = Status.CREATED;
      })
      .on(VALIDATION_ERROR, (error) => {
        ctx.body = {
          type: 'ValidationError',
          details: error.details,
        };
        ctx.status = Status.BAD_REQUEST;
      })
      .on(ERROR, next);

    await userService.createUser(ctx.request.body);
  },

  async update(ctx, next) {
    const userService = ctx.scope.resolve('userService');
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = userService.outputs;
    userService
      .on(SUCCESS, (user) => {
        ctx.body = user;
        ctx.status = Status.CREATED;
      })
      .on(VALIDATION_ERROR, (error) => {
        ctx.body = {
          type: 'ValidationError',
          details: error.details,
        };
        ctx.status = Status.BAD_REQUEST;
      })
      .on(NOT_FOUND, (error) => {
        ctx.body = {
          type: 'NOT_FOUND',
          details: error.details,
        };
        ctx.status = Status.NOT_FOUND;
      })
      .on(ERROR, next);

    await userService.updateUser(Number(ctx.params.id), ctx.request.body);
  },

  async delete(ctx, next) {
    const userService = ctx.scope.resolve('userService');
    const { SUCCESS, ERROR, NOT_FOUND } = userService.outputs;
    userService
      .on(SUCCESS, () => {
        ctx.status = Status.ACCEPTED;
      })
      .on(NOT_FOUND, (error) => {
        ctx.body = {
          type: 'NOT_FOUND',
          details: error.details,
        };
        ctx.status = Status.NOT_FOUND;
      })
      .on(ERROR, next);

    await userService.deleteUser(Number(ctx.params.id));
  },

};

module.exports = UsersController;
