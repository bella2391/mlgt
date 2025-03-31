import express, { Request, Response, NextFunction } from 'express';
import { requireNonLogin } from '../middlewares/checker';
import { commonAuth } from '../controllers/authController';

const router: express.Router = express.Router();

router.get('/', (req: Request, res: Response, _: NextFunction) => {
  res.render('signin', { title: 'Sign in' });
});

router.post('/', requireNonLogin, commonAuth('local'));

export default router;
