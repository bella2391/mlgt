import { Request, Response, NextFunction } from 'express';
import '../config';
import basepath from '../utils/basepath';

const localvals = async (req: Request, res: Response, next: NextFunction) => {
  res.locals.application_name = process.env.APP_NAME || 'App';
  res.locals.rootpath = basepath.rootpath;
  res.locals.hpurl = basepath.hpurl;
  res.locals.org_name = process.env.ORG_NAME || '';
  res.locals.org_year = process.env.ORG_YEAR || '';
  res.locals.org_logourl = process.env.ORG_LOGO_URL || '';
  res.locals.isAuth = req.isAuthenticated();

  res.locals.csrfToken = req.csrfToken ? req.csrfToken() : '';

  next();
};

export default localvals;
