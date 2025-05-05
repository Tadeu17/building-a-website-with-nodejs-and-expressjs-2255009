import express, { Router, Request, Response } from 'express'; // Use TypeScript imports

export default (params): Router => {
  const router: Router = express.Router();

  const { speakerService } = params;

  router.get('/', async (req: Request, res: Response) => {
    const speakers = await speakerService.getList();
    res.render('layout', { pageTitle: 'Speakers!', template: 'speakers', speakers });
  });
  router.get('/:shortname', (req: Request, res: Response) => {
    res.send('Speaker added' + req.params.shortname);
  });

  return router;
};
