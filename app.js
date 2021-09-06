const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const path = require("path");
const api = require('./api');

require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, 'uploads')));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(cors())
app.use(express.json())
app.use(logger(formatsLogger))

app.use('/api/v1/contacts', api.contacts);
app.use("/api/v1/auth", api.auth);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((error, _, res, __) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({
    status: "error",
    code: status,
    message,
  });
});

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => app.listen(PORT))
  .catch((error) => console.log(error));


