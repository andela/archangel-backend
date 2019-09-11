
const ISOMonth = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12];

export default {
    isDateValid: (inputDate) => {
        var validDate = Date.parse(inputDate);
        return validDate;
    },

    getTodayDate: () => {
        var _date = new Date();
        var todayDate = `${_date.getFullYear()}-${ISOMonth[_date.getMonth()]}-${_date.getDate()}`;
        return todayDate;
    },

    setFutureDate(numberOfDaysAhead) {
        var todayDate = this.getTodayDate();
        //set the date for the return here..
        var futureDate = todayDate.setDate(todayDate.getDate() + numberOfDaysAhead);
        var newFutureDate = new Date(futureDate);
        var returnDate = `${newFutureDate.getFullYear()}
                          -${ISOMonth[newFutureDate.getMonth()]}-${newFutureDate.getDate()}`;
        return returnDate;
    }
}
