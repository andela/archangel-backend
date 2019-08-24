import ApiErrors from '../utils/errorClass';
import { findUserByEmail, comparePassword } from '../services/loginServices';
import { generateToken } from '../utils/generateToken';
import response from '../utils/response';
import messages from '../utils/messages';
import statusCode from '../utils/statusCode';

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validUser = await findUserByEmail(email);
    if (validUser == null || validUser == undefined) {
      throw new ApiErrors(messages.userEmailNotFound(email), statusCode.notFound);
    };
    const { password : hashedPassword, ...data } = validUser.dataValues;
    const validPassword = await comparePassword(password, hashedPassword);
    if (!validPassword) {
      throw new ApiErrors(messages.incorrectPassword, statusCode.badRequest);
    }
    else {
      const token = generateToken({ ...data });
      return response(res, statusCode.success, 'success', { ...data, token });
    };
  } catch (err) {
      response(res, err.statusCode || statusCode.serverError, 'error', { error: err.message });
  }
}

export default signIn;
