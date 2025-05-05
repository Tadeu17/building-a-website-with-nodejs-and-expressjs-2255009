import express, { Router, Request, Response } from 'express';
import speakersRoute from './speakers';
import feedbackRoute from './feedback';

export default function (params): Router {
  const router = express.Router();

  router.get('/', (req: Request, res: Response) => {
    res.render('layout', { pageTitle: 'Welcome!', template: 'index' });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
}
