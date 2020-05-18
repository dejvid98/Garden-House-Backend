const express = require('express');
const cors = require('cors');
const login = require('./routes/LoginRoute');
const register = require('./routes/RegisterRoute');
const passwordChange = require('./routes/PasswordChangeRoute')
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', login);

app.use('/register', register);

app.use('/passwordchange',passwordChange);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running!');
});
