import { rankModel } from './model/rankModel';
import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';
import logger from 'morgan';
import { log } from './logger';
import { port, user, host, database, password, postgresPort } from './config';
import { errorHandler, loginRequired, userHandler } from './middlewares';
import {
  indexRouter,
  guestRouter,
  authRouter,
  postRouter,
  noticeRouter,
  reviewRouter,
  adviceRouter,
} from './routers';
import { endPoint } from './constants';
import { Pool } from 'pg';
import { userRouter } from './routers/userRouter';

require('./passport')();
const app = express();

export const pg = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: postgresPort,
});

pg.connect()
  .then(() => log.info(`database Connect`))
  .catch((err) => log.err('connection error', err.stack));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get(endPoint.index, indexRouter);
app.use(endPoint.auth, authRouter);
app.use(endPoint.guest, userHandler, guestRouter);
app.use(endPoint.post, loginRequired, postRouter);
app.use(endPoint.review, loginRequired, reviewRouter);
app.use(endPoint.notice, noticeRouter);
app.use(endPoint.advice, adviceRouter);
app.use(endPoint.user, loginRequired, userRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

app.listen(port, () => {
  log.info(`Server listening on port: ${port}`);
});

cron.schedule(
  '* * 1-12 * *',
  async () => {
    try {
      await rankModel.resetElevation();
    } catch (e) {
      log.error(e);
    }
  },
  {
    scheduled: true,
    timezone: 'Asia/Seoul',
  }
);


