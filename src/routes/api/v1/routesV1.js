import { Router } from 'express';
import messages from '../../../utils/messages';
import response from '../../../utils/response';
import statusCode from '../../../utils/statusCode';
import signIn from  '../../../controllers/loginController';

const routerV1 = Router();

// handles the api home route...
routerV1.all('/', (req, res) => response(res, statusCode.success, 'success', { message: messages.welcome }));
routerV1.post('/user/login', signIn);

export default routerV1;
