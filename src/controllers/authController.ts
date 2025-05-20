import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import config from '../config';
import { requireNonLogin } from '../middlewares/checker';

export function setupAuthRoutes(router: express.Router, authtypes: string[]) {
  authtypes.forEach(authtype => {
    router.get(`/${authtype}`, requireNonLogin, passport.authenticate(authtype));
    router.get(`/${authtype}/callback`, requireNonLogin, commonAuth(authtype));
  });
}

export const commonAuth = (authtype: string) => (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(authtype, (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }

    const authlocal: boolean = authtype === 'local';

    if (!user) {
      if (authlocal && info && info.redirectUrl) {
        return res.redirect(info.redirectUrl);
      }
      return res.status(401).send(info.message || 'Authentication failed')
    }

    const data = { successMessage: [(!authlocal ? authtype : 'default') + ' login successfully!'] };

    loginRedirect(req, res, next, user, data);
  })(req, res, next);
}

export function loginRedirect(req: Request, res: Response, next: NextFunction, user: any, data: any, timeout: number = 3000) {
  if (data.redirect_url) {
    if (typeof data.redirect_url != 'string') {
      throw new Error("Must be included redirect_url: string in data");
    }
  } else {
    data['redirect_url'] = `${config.server.root}/`;
  }

  data['timeout'] = timeout;

  req.login(user, (err) => {
    if (err) {
      return next(err);
    }

    return res.render('redirect', data);
  });
}
