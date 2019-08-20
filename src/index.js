import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/config';
import express from 'express';
import logger from 'morgan';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('test'));

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});