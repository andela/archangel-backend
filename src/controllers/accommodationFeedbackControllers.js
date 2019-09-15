import {
  createFeedback,
  getAllFeedbacks,
} from '../services/accomodationFeedbackServices';
import {
  successResponseWithData,
  errorResponse,
} from '../utils/response';

import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

export const createAccommodtionFeedback = async (req, res) => {
  try {
    const { accommodation_id } = req.params;
    const {
      accommodation_name, email, full_name, feedback,
    } = req.body;
    const accommodationData = await createFeedback({
      accommodation_id: parseInt(accommodation_id, 10),
      accommodation_name,
      author_email: email,
      author_name: full_name,
      feedback,
    });
    const returnedFeedback = accommodationData.dataValues;

    successResponseWithData(
      res,
      statusCode.created,
      message.newFeedback(accommodation_name),
      returnedFeedback
    );
  } catch (err) {
    errorResponse(res, statusCode.serverError, err);
  }
};

export const getAccommodtionFeedbacks = async (req, res) => {
  try {
    const feedbacks = await getAllFeedbacks(req.params.accommodation_id);

    successResponseWithData(
      res,
      statusCode.success,
      message.getFeedback(req.body.accommodation_name),
      feedbacks
    );
  } catch (err) {
    errorResponse(res, statusCode.serverError, err);
  }
};
