const ISOMonth = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12];

export default {
  isDateValid: (inputDate) => {
    let validDate = Date.parse(inputDate);
    return validDate;
  },

  getTodayDate: () => {
    let date = new Date();
    let todayDate = `${date.getFullYear()}-${ISOMonth[date.getMonth()]}-${date.getDate()}`;
    return todayDate;
  },

  setFutureDate(numberOfDaysAhead) {
    let todayDate = this.getTodayDate();
    // set the date for the return here..
    let futureDate = todayDate.setDate(todayDate.getDate() + numberOfDaysAhead);
    let newFutureDate = new Date(futureDate);
    let returnDate = `${newFutureDate.getFullYear()}
                      -${ISOMonth[newFutureDate.getMonth()]}-${newFutureDate.getDate()}`;
    return returnDate;
  }
};
