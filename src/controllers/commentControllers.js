import {
  createComment,
  getAllComments,
  destroyComment,
} from '../services/commentServices';
import {
  successResponseWithData,
  successResponse,
  errorResponse,
} from '../utils/response';

import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

export const addComment = async (req, res) => {
  try {
    const { travel_id } = req.params;
    const { email, full_name, comment } = req.body;
    const commentData = await createComment({
      travel_id: parseInt(travel_id, 10),
      author_email: email,
      author_name: full_name,
      comment,
    });
    const returnedData = commentData.dataValues;

    successResponseWithData(
      res,
      statusCode.created,
      message.successComment[0],
      returnedData
    );
  } catch (err) {
    errorResponse(res, statusCode.serverError, err);
  }
};

export const getComments = async (req, res) => {
  try {
    const { travel_id } = req.params;
    const comments = await getAllComments(travel_id);

    successResponseWithData(
      res,
      statusCode.success,
      message.successComment[1],
      comments
    );
  } catch (err) {
    errorResponse(res, statusCode.serverError, err);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { comment_id } = req.params;

    await destroyComment(comment_id);
    successResponse(res, statusCode.success, message.deleteComment);
  } catch (err) {
    errorResponse(res, statusCode.serverError, err);
  }
};
