import express, { Router, Request, Response } from 'express'; // Use TypeScript imports

export default (): Router => {
  const router: Router = express.Router();

  router.get('/', (req: express.Request, res: express.Response) => {
    res.send('Speakers list');
  });

  router.get('/:shortname', (req: Request, res: Response) => {
    res.send('Speaker added' + req.params.shortname);
  });

  return router;
};
