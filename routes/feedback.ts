import express, { Router, Request, Response } from 'express'; // Import Request and Response explicitly

const router: Router = express.Router();

export default (): Router => {
  router.get('/', (req: Request, res: Response) => {
    res.send('Feedback list, ' + req);
  });

  router.post('/', (req: Request, res: Response) => {
    res.send('Feedback posted' + req);
  });

  return router;
};
