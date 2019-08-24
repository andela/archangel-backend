import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import debug from 'debug';
import cors from 'cors';
import methodOverride from 'method-override';

import messages from './utils/messages';
import routerV1 from './routes/api/v1/routesV1';
import response from './utils/response';
import statusCode from './utils/statusCode';

// import routes from './routes';

dotenv.config();
const debugLog = debug('web-app');

const app = express();
const PORT = process.env.port || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.options('*', cors());

app.use(methodOverride());

// serve the api endpoints built in routes folder
// app.use(routes);

// handles the api home route...
app.all('/', (req, res) => response(res, statusCode.success, 'success', { message: messages.defaultWelcome }));

// This is the point where the main API routes is served from...
app.use('/api/v1', routerV1);

const isProduction = process.env.NODE_ENV === 'production';

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = statusCode.notFound;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
	app.use((err, req, res, next) => {
		debugLog(`Error Stack: ${err.stack}`);

		res.status(err.status || statusCode.serverError);

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
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	res.status(err.status || statusCode.serverError);
	res.json({
		errors: {
			message: err.message,
			error: {},
		},
	});
	next();
});

const server = app.listen(PORT, () => {
	debugLog(`Barefoot-Nomad [Backend] Server is running on port ${PORT}`);
});

// for testing
module.exports = app;
