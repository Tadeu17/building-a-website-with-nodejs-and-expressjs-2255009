import express, { Router, Request, Response } from 'express'; // Use TypeScript imports

export default (params): Router => {
  const router: Router = express.Router();

  const { speakerService } = params;

  router.get('/', async (req: Request, res: Response) => {
    const speakers = await speakerService.getList();
    const artwork = await speakerService.getAllArtwork();
    res.render('layout', { pageTitle: 'Speakers!', template: 'speakers', speakers, artwork });
  });
  router.get('/:shortname', async (req: Request, res: Response) => {
    const speaker = await speakerService.getSpeaker(req.params.shortname);
    const artwork = await speakerService.getArtworkForSpeaker(req.params.shortname);
    res.render('layout', { pageTitle: 'Speakers!', template: 'speakers-detail', speaker, artwork });
  });

  return router;
};
