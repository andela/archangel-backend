import { Router } from 'express';
import tokenValidation from '../../middlewares/verifytoken';
import  authController  from '../../controllers/authControllers';
const  { getToken, verifyToken } = tokenValidation;
const { logout } = authController;
const route = Router();

route.post("/auth/logout",
	getToken,
	verifyToken,
	logout,
);

export default route;