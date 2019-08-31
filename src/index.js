import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import debug from 'debug';
import cors from 'cors';
import methodOverride from 'method-override';

import message from './utils/messageUtils';
import response from './utils/response';
import statusCode from './utils/statusCode';
import routes from './routes/api';

dotenv.config();
const debugLog = debug('web-app');

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

// handles the api home route...
app.all('/', (req, res) => response.successResponse(res, statusCode.success, message.defaultWelcome));

// This is the point where the main API routes is served from...
app.all(`${prefix}/`, (req, res) => {
  response.successResponse(res, statusCode.success, message.welcome);
});

// serve the api endpoints built in routes folder
routes(prefix, app);


const isProduction = process.env.NODE_ENV === 'production';

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
module.exports = app;
