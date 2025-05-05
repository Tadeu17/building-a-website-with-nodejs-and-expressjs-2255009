import express, { Router, Request, Response } from 'express';
import speakersRoute from './speakers';
import feedbackRoute from './feedback';

export default function (params): Router {
  const router = express.Router();

  const { speakerService } = params;

  router.get('/', async (req: Request, res: Response) => {
    const artwork = await speakerService.getAllArtwork();
    const topSpeakers = await speakerService.getList();
    res.render('layout', { pageTitle: 'Welcome!', template: 'index', topSpeakers, artwork });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
}
