import Router from 'koa-router';
import methodOverride from 'koa-methodoverride';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';

import controller from './utils/createControllerRoutes';

module.exports = ({ loggerMiddleware, errorHandler }) => {
  const router = Router();
  router.use(loggerMiddleware);

  const apiRouter = Router();
  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(compress())
    .use(bodyParser());

  apiRouter.use('/users', controller('user/UsersController'));
  router.use('/api', apiRouter.routes());
  apiRouter.use(errorHandler);


  return apiRouter;
};
