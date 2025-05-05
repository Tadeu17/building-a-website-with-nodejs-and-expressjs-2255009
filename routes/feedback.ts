import express, { Router, Request, Response } from 'express'; // Import Request and Response explicitly

const router: Router = express.Router();

export default (params): Router => {
  const { feedbackService } = params;

  router.get('/', async (req: Request, res: Response) => {
    const feedback = await feedbackService.getList();
    res.json(feedback);
  });

  router.post('/', (req: Request, res: Response) => {
    res.send('Feedback posted' + req);
  });

  return router;
};
