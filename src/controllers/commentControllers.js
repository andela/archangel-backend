import commentServices from '../services/commentServices';

import message from '../utils/messageUtils';
import response from '../utils/response';
import statusCode from '../utils/statusCode';

const { createComment } = commentServices;
const { successResponseWithData, errorResponse } = response;

export default {
	addComment: async (req, res) => {
		try {
			const { travel_id } = req.params;
			const { email, full_name, comment } = req.body;

			const commentObj = {
				travel_id: parseInt(travel_id, 10),
				author_email: email,
				author_name: full_name,
				comment,
			};
			const commentData = await createComment(commentObj);

			const data = commentData.dataValues;

			successResponseWithData(
				res,
				statusCode.created,
				message.successComment,
				data
			);
		} catch (err) {
            errorResponse(res, statusCode.serverError, err);
		}
	},
};
