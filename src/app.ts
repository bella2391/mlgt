import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import flash from 'connect-flash';
import favicon from 'serve-favicon';
import config from './config';
import router from './controllers/routeController';
import session from './middlewares/session';
import passport from './middlewares/passport';
import localvals from './middlewares/localvals';
import preErrorHandler from './middlewares/pre-error-handler';
import csrfProtection from './middlewares/csurf';
import mycors from './middlewares/cors';
import errorHandler from './middlewares/error-handler';

const app = express();

// if you use proxy e.g cloudflare tunnel or nginx, write below for relying on requests
// this is needed for working req.session
// More strictly, you can also specify Cloudflare's IP range.
app.set('trust proxy', 1);

console.log('> current mode is ' + process.env.NODE_ENV);
console.log('> current url is ' + config.server.url);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(session);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(csrfProtection);

app.use(localvals);

app.use(preErrorHandler);

app.use('/', router);

app.use(mycors);

app.use((_: Request, __: Response, next: NextFunction) => next(createError(404)));

app.use(errorHandler);

export default app;
