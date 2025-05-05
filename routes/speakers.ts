import express, { Router, Request, Response } from 'express'; // Use TypeScript imports

export default (params): Router => {
  const router: Router = express.Router();

  const { speakerService } = params;

  router.get('/', async (req: express.Request, res: express.Response) => {
    console.log('about to return speakers');
    
    const speakers = await speakerService.getList();
    res.json(speakers);
  });

  router.get('/:shortname', (req: Request, res: Response) => {
    res.send('Speaker added' + req.params.shortname);
  });

  return router;
};
