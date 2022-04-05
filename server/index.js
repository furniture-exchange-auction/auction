require('dotenv').config();

const express = require('express');

const cors = require('cors');
const path = require('path');
const authRouter = require('./routes/auth');

const db = require('./models/auction');

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files
app.use(express.static(path.join(__dirname, '../app/out')));

// configure routes
app.use('/api', authRouter);

//test
app.get('/api', (req, res, next) => {
  res.send('backend connected');
});

// db test
app.get('/api/auction', (req, res, next) => {
  db.query('SELECT * FROM account')
    .then((data) => {
      console.log('query successful', data.rows);
      res.json(data.rows);
    })
    .catch((err) => {
      console.log('query unsuccessful', err);
      res.send(err);
    });
});

//respond with entry point to Next.js applciation
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/out/index.html'));
});

//Page not found catch-all
app.use('/*', (req, res, next) => {
  res.status(404).json('Page not found.');
});

// configire express global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// intialize the server and logs a message
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});

module.exports = app;
