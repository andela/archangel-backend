import ApiErrors from '../utils/ApiErrors';
import message from '../utils/messageUtils';
import response from '../utils/response';
import statusCode from '../utils/statusCode';
import dateUtils from '../utils/dateUtils';

const { isDateValid, getTodayDate } = dateUtils;
const { errorResponse } = response;

export default{

  departureDateValidator: (req, res, next) => {
      var todayDate = getTodayDate();
      const { departure_date} = req.body;
      if (new Date(todayDate) > new Date(departure_date) ) {
          return errorResponse(res, statusCode.badRequest, message.dateForToday);
      }
      return next();
  },

  futureDateValidator: (req, res, next) => {
    const {departure_date, return_date} = req.body;
    if (new Date(return_date) <= new Date(departure_date)) {
        return errorResponse(res, statusCode.badRequest, message.dateForFuture);
      }
      return next();
  }
}
