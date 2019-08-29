import { Router } from 'express';
import messages from '../../utils/messages';
import response from '../../utils/response';
import statusCode from '../../utils/statusCode';
import { signIn } from  '../../controllers/authController';

const router = Router();

// handles the api home route...
router.all('/', (req, res) => response(res, statusCode.success, 'success', { message: messages.welcome }));
router.post('/user/login', signIn);

export default router;
