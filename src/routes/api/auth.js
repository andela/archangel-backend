import express from 'express';
import { resetPasswordController } from '../../controllers';

const { sendPasswordResetEmail, receiveNewPassword } = resetPasswordController;
export const userRouter = express.Router();


userRouter.route('/forgot').post(sendPasswordResetEmail);
userRouter.route('/receive_new_password/:userId/:token').post(receiveNewPassword);