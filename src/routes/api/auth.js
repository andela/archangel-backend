import express from 'express';
import bodyParser from "body-parser";
import { getToken, verifyToken, LogoutAction } from '../../middlewares/verifytoken';
import { logout } from '../../controllers';
const route = express.Router();
route.use(express.json());
route.use(bodyParser.urlencoded({ 
extended: true }));

route.use(bodyParser.text({ type: "application/json" }));
route.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization");
	next();
});

route.post("/api/v1/auth/logout", getToken, verifyToken, LogoutAction, logout);

export default route;