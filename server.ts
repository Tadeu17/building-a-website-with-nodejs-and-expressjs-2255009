import express, { Application } from 'express';
import path from 'path';
import routes from './routes';

const app: Application = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/speakers', (req, res) => {
  res.sendFile(path.join(__dirname, './static/speakers.html'));
});

app.use('/', routes());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
