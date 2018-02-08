/* @flow */

import Koa from 'koa';
// flow-disable-line
import { createContainer, asValue, asFunction, asClass } from 'awilix';
// flow-disable-line
import { scopePerRequest } from 'awilix-koa';
// flow-disable-line
import { AwilixContainer } from 'awilix/lib/container';

import Application from './app/Application';
import Server from './interfaces/Server';
import router from './interfaces/http/router';
import logger from './infrastructure/logging/logger';

import loggerMiddleware from './interfaces/http/logging/loggerMiddleware';
import errorHandler from './interfaces/http/errors/errorHandler';
import UserSerializer from './interfaces/http/user/UserSerializer';

import config from '../config';
import UserService from './domain/user/service/UserService';
import UserRepository from './domain/user/repository/UserRepository';

const container: AwilixContainer = createContainer();

const application = new Koa();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton(),
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton(),
    config: asValue(config),
    application: asValue(application),
  });


// Middlewares
container
  .register({
    containerMiddleware: scopePerRequest(container),
    errorHandler: asValue(errorHandler),
    loggerMiddleware: asFunction(loggerMiddleware).singleton(),
  });

// Repositories
container
  .register({
    userRepository: asClass(UserRepository).singleton(),
  });

// Operations
application.use((ctx, next) => {
  ctx.scope = container.createScope();
  ctx.scope.register({
    userService: asClass(UserService),
    logger: asFunction(logger).singleton(),
  });
  return next();
});

container.register({
  userSerializer: asValue(UserSerializer),
});

export default container;
