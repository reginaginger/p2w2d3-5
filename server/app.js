const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const meetupRouter = require('./src/router/meetups.router');
const authRouter = require('./src/router/auth.router');
const tokensRouter = require('./src/router/tokens.router');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use('/api/tokens', tokensRouter);
app.use('/api/meetups', meetupRouter);
app.use('/api/auth', authRouter);

module.exports = app;
