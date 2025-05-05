import express, { Application } from 'express'; // Import Application as a type
import path from 'path';

const app: Application = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.render('pages/index', { pageTitle: 'Welcome!' });
});

app.get('/speakers', (req, res) => {
  res.sendFile(path.join(__dirname, './static/speakers.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
