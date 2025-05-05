import express, { Router, Request, Response } from 'express';
import speakersRoute from './speakers';
import feedbackRoute from './feedback';

export default function (): Router {
  const router = express.Router();

  router.get('/', (req: Request, res: Response) => {
    res.render('pages/index', { pageTitle: 'Welcome!' });
  });

  router.use('/speakers', speakersRoute());
  router.use('/feedback', feedbackRoute());

  return router;
}
