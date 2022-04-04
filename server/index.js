require('dotenv').config();

const express = require('express');

const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files
app.use(express.static(path.join(__dirname, '../app/out')));

// configure routes
app.get('/api', (req, res, next) => {
  res.send('backend connected');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/out/index.html'));
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
