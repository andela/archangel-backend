import express from 'express';
import { sendToken, verifyToken } from '../../controllers/emailVerficationController';


const router = express.Router();

router.post('/api/v1/send', sendToken);
router.get('/api/v1/confirmation/:token', verifyToken);

export default router;
