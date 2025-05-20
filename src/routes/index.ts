import express, { Request, Response, NextFunction } from 'express';
import knex from '../config/knex';
import config from '../config';

const router: express.Router = express.Router();

router.get('/', async (req: Request, res: Response, _: NextFunction) => {
  if (req.isAuthenticated()) {
    const userId: number = (req.user as any).id;
    knex('tasks')
      .select("*")
      .where({ user_id: userId })
      .then((results) => {
        res.render('index', {
          todos: results,
          isAuth: true,
        });
      })
      .catch((err) => {
        console.error(err);
        res.render('index', {
          isAuth: true,
          errorMessage: [err.sqlMessage],
        });
      });
  } else {
    res.render('index', {
      isAuth: false,
    });
  }
});

router.post('/', async (req: Request, res: Response, _: NextFunction) => {
  if (req.isAuthenticated()) {
    //const userId: number = (req as Express.AuthenticatedRequest).user.id;
    const userId: number = (req.user as any).id;
    const todo: string = req.body.add;

    knex("tasks")
      .insert({ user_id: userId, content: todo })
      .then(() => {
        res.redirect(`${config.server.root}/`);
      })
      .catch((err) => {
        console.error(err);
        res.render('index', {
          isAuth: true,
          errorMessage: [err.sqlMessage],
        });
      })
  }
});

export default router;
