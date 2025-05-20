import express, { Request, Response } from 'express';
import { requireNonLogin } from '../middlewares/checker';
import { commonAuth } from '../controllers/authController';

const router: express.Router = express.Router();

router.get('/', (_: Request, res: Response) => {
  res.render('signin', { title: 'Sign in' });
});

router.post('/', requireNonLogin, commonAuth('local'));

export default router;
