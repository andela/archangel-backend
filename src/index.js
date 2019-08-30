import express from 'express';
import bodyparser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import errorhandler from 'errorhandler';
import dotenv from 'dotenv';
import logger from 'morgan';
import debug from 'debug';
import cors from 'cors';
import methodOverride from 'method-override';

import { fbStrategy, googleStrategy } from './config/passport';
import message from './utils/messageUtils';
import response from './utils/response';
import statusCode from './utils/statusCode';
import routes from './routes/api';

dotenv.config();
// Create global app object
const app = express();

const debugLog = debug('web-app');
const { port } = process.env;
const prefix = '/api/v1';

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.options('*', cors());
app.use(methodOverride());

app.use(logger('dev'));

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

app.get(`${prefix}/`, (req, res) => {
    response.successResponse(res, statusCode.success, message.welcome);
});

const isProduction = process.env.NODE_ENV === 'production';

// Normal express config defaults
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

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

if (!isProduction) {
  app.use(errorhandler());
}
// serve the api endpoints built in routes folder

// catch 404 and forward to error handler
 app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/', (req, res) => {
   res.status(200).send({
        status: 200,
        message: 'Welcome to my Archangel Barefoot Nomad Web App API.',
    }); 
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

app.listen(port || 5000, () => {
    debugLog(`Barefoot-Nomad [Backend] Server is running on port ${port}`);
});

// for testing
module.exports = app;
