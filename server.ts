import express, { Application } from 'express';
import path from 'path';
import cookieSession from 'cookie-session';
import routes from './routes';
import bodyParser from 'body-parser';

import FeedbackService from './services/FeedbackService';
import SpeakerService from './services/SpeakerService';

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app: Application = express();
const port = 3000;

// REALLY HARD TO TRACK DOWN
app.set('trust proxy', 1); // makes express trust the first proxy, a reverse proxy, like nginx

app.use(
  cookieSession({
    name: 'session',
    keys: ['KJHvfHSDK:JHFGlhOSDFHg;oSDg', 'HKHGKfdhgolhB:KJFDBgkjldfbglkdfjb'],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'Roux meetups';

app.use(express.static(path.join(__dirname, 'static')));

app.use(async (req, res, next) => {
  try {
    const names = await speakerService.getNames();
    res.locals.speakerNames = names;
    next();
  } catch (error) {
    console.error('Error in middleware:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakerService,
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
