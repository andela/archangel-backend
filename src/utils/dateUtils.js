
export default {
  isDateValid: (inputDate) => {
    var validDate = Date.parse(inputDate);
    return validDate;
  },

  getTodayDate: () => {
    var _date = new Date()
    var todayDate = `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`;
    return todayDate;
  },
}
