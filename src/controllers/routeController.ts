import express from 'express';
import indexRouter from '../routes/index';
import signupRouter from '../routes/signup';
import signinRouter from '../routes/signin';
import logoutRouter from '../routes/logout';
import authRouter from '../routes/auth';
import apiRouter from '../routes/api';

const router: express.Router = express.Router();

router.use('/', indexRouter);
router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use('/logout', logoutRouter);
router.use('/auth', authRouter);
router.use('/api', apiRouter);

export default router;

