import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import logger from 'morgan';
import debug from 'debug';
import cors from 'cors';
import methodOverride from 'method-override';

import { fbStrategy, googleStrategy } from './config/passport';
import message from './utils/messageUtils';
import { successResponse } from './utils/response';
import statusCode from './utils/statusCode';
import routes from './routes';

dotenv.config();
const debugLog = debug('web-app');
// Create global app object
const app = express();


const PORT = process.env.PORT || 5000;
const prefix = '/api/v1';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.options('*', cors());

app.use(methodOverride());

// social media authentication
passport.use(fbStrategy);
passport.use(googleStrategy);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});


// serve the api endpoints built in routes folder
routes(prefix, app);
// handles the api home route...
app.all('/', (req, res) => successResponse(res, statusCode.success, message.defaultWelcome));
// serve the api endpoints built in routes folder
// app.use(routes);
// app.use('/', router);


app.get(`${prefix}/`, (req, res) => {
  successResponse(res, statusCode.success, message.welcome);
});

const isProduction = process.env.NODE_ENV === 'production';

// creating session
app.use(
  session({
    secret: 'authorshaven',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// serve the api endpoints built in routes folder

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    debugLog(`Error Stack: ${err.stack}`);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
    next();
  });
}

// production error handler
// no stack-traces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
  next();
});

app.listen(PORT, () => {
  debugLog(`Barefoot-Nomad [Backend] Server is running on port ${PORT}`);
});

// for testing
export default app;
