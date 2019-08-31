import ApiErrors from '../utils/ApiErrors';

import authServices from '../services/authServices';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import message from '../utils/messageUtils';
import response from '../utils/response';
import statusCode from '../utils/statusCode';
import transporter from '../config/nodemailerConfig';

const { comparePassword, findUserByEmail,
        logoutService, signupService } = authServices;
const { generateToken } = tokenMiddleware;
const { successResponseWithData, successResponse, errorResponse } = response;

export default {
    signup: async(req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body;
            const userObj = { first_name, last_name, email, password, role: 'user' };

            const user = await signupService(userObj);
            const data = user.dataValues;

            data.token = generateToken(data.id, email, data.role, first_name);
            delete data.password;
           next();
        } catch (err) {
            errorResponse(res, err.statusCode || statusCode.serverError, err);
        }
    },

    login: async (req, res) => {
     try {
       const { email, password } = req.body;
       const validUser = await findUserByEmail(email);
       if (validUser == null || validUser == undefined) {
         throw new ApiErrors(message.userEmailNotFound(email), statusCode.notFound);
       };
       const { password : hashedPassword, ...data } = validUser.dataValues;
       const validPassword = await comparePassword(password, hashedPassword);
       if (!validPassword) {
         throw new ApiErrors(message.incorrectPassword, statusCode.badRequest);
       }
       else {
         const token = generateToken(data.id, email, data.role, data.first_name);
         return successResponseWithData(res, statusCode.success, message.loginSuccess, { ...data, token });
       };
     } catch (err) {
            errorResponse(res, err.statusCode || statusCode.serverError, err);
     }
   },

   logout: async (req,res) => {
     try {
       const { token } = req;
       await logoutService(token);
       successResponse(res, statusCode.success, message.logoutSuccess);
     } catch (err) {
       errorResponse(res, statusCode.serverError, err.message);
     }
   },
   sendEmail: (req, res) => {
    const url = 'http://localhost:5000/homepage';
        transporter.sendMail({
          to: req.email,
          subject: 'Confirm Email',
          html: `please, click the link to confirm email: <a href="${url}">${url}</a>`
      }, (err, response) => {
          if (err) {
              console.log(err);
          } else {
          console.log('successfull sent');
          }
      });
      const { data } = res.locals;
      successResponseWithData(res, statusCode.created, message.signupSuccess(req.email), data);
      }
};
