import ApiErrors from '../utils/ApiErrors';
import message from '../utils/messageUtils';
import response from '../utils/response';
import statusCode from '../utils/statusCode';
import dateUtils from '../utils/dateUtils';

const { isDateValid, getTodayDate } = dateUtils;

export default{

  currentDateValidator: (current_date) => {
      var todayDate = getTodayDate();
      if (!(isDateValid(current_date) && (todayDate == current_date))) {
          throw new Error(message.dateForToday);
        }
  },

  futureDateValidator: (future_date) => {
      var todayDate = getTodayDate();
      if (!(isDateValid(future_date) && (future_date <= todayDate))) {
        throw new Error(message.dateForFuture);
      }
  },
}
