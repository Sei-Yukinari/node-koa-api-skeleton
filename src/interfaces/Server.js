import cors from 'koa-cors';

export default class Server {
  constructor({ config, application, logger, router }) {
    this.config = config;
    this.app = application;
    this.logger = logger;
    const corsOptions = {
      origin: '*',
      allowHeaders: 'allowHeaders',
    };
    this.app
      .use(router.routes())
      .use(cors(corsOptions));
  }

  start() {
    const port = this.config.web.port;
    this.app.listen(port, this.logger.info(`[pid ${process.pid}] Listening at port ${port}`));
  }
}
