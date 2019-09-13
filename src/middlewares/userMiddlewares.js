import { findUserByEmail } from '../services/authServices';
import { findTravelById } from '../services/travelServices';
import { getAComment } from '../services/commentServices';
import { getADepartment } from '../services/departmentServices';
import { errorResponse } from '../utils/response';

import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

export const confirmUserEmail = async (req, res, next) => {
  const { email } = req.userData;
  if (!email || !email.trim()) {
    return errorResponse(res, statusCode.badRequest, message.emptyEmail);
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return errorResponse(
      res,
      statusCode.notFound,
      message.unregisteredEmail(email)
    );
  }

  req.body = {
    ...req.body,
    full_name: `${user.first_name} ${user.last_name}`,
    email,
  };
  return next();
};

export const verifyTravelOwner = async (req, res, next) => {
  try {
    const travelObj = await findTravelById(req.params.travel_id);

    if (travelObj === null) {
      return errorResponse(res, statusCode.notFound, message.travelNotFound);
    }
    const travel = travelObj.dataValues;
    const dept = await getADepartment(travel.dept_id);

    if (parseInt(travel.user_id, 10) !== req.userData.id
        && dept.dataValues.manager_user_id !== req.userData.id) {
      return errorResponse(
        res,
        statusCode.unauthorized,
        message.unauthorizedAccessToTravel
      );
    }
    return next();
  } catch (err) {
    errorResponse(res, statusCode.serverError, err);
  }
};

export const verifyCommentOwner = async (req, res, next) => {
  try {
    const commentObj = await getAComment(req.params.comment_id);

    if (commentObj === null) {
      return errorResponse(res, statusCode.notFound, message.commentNotFound);
    }
    const comment = commentObj.dataValues;

    if (comment.author_email !== req.userData.email) {
      return errorResponse(
        res,
        statusCode.unauthorized,
        message.unauthorizedCommentDelete
      );
    }
    return next();
  } catch (err) {
    errorResponse(res, statusCode.serverError, err);
  }
};

export const verifyRole = (role) => (req, res, next) => {
  if (role !== req.userData.role) {
    return errorResponse(res, statusCode.unauthorized, message.wrongRole(role));
  }
  return next();
};
