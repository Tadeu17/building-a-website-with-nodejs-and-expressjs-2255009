import express, { Router, Request, Response } from 'express'; // Import Request and Response explicitly
import { check, validationResult } from 'express-validator';

const router: Router = express.Router();

export default (params): Router => {
  const { feedbackService } = params;

  router.get('/', async (req: Request, res: Response) => {
    // @ts-ignore no need to check session type
    const errors = req.session.feedback ? req.session.feedback.errors : false;

    // @ts-ignore
    const successMessage = req.session.feedback ? req.session.feedback.message : false;

    // @ts-ignore
    req.session.feedback = {}; // Clear the session feedback after using it

    const feedback = await feedbackService.getList();
    res.render('layout', {
      pageTitle: 'Feedback!',
      template: 'feedback',
      feedback,
      errors,
      successMessage,
    });
  });

  router.post(
    '/',
    [
      check('name').trim().isLength({ min: 3 }).escape().withMessage('A name is required'),
      check('email').trim().isEmail().normalizeEmail().withMessage('A valid email is required'),
      check('title').trim().isLength({ min: 3 }).escape().withMessage('A title is required'),
      check('message').trim().isLength({ min: 5 }).escape().withMessage('A message is required'),
    ],
    async (req: Request, res: Response) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // @ts-ignore no need to declare the session type
        req.session.feedback = {
          errors: errors.array(),
        };

        return res.redirect('/feedback');
      }

      const { name, email, title, message } = req.body;
      await feedbackService.addEntry(name, email, title, message);

      // @ts-ignore
      req.session.feedback = {
        message: 'Thank you for your feedback!',
      };

      res.redirect('/feedback');
    }
  );

  router.post('/api', async (req: Request, res: Response) => {
    const { name, email, title, message } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }
    await feedbackService.addEntry(name, email, title, message);
    res.status(201).json({ message: 'Feedback added successfully' });
  });

  return router;
};
