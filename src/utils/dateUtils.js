const ISOMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12];


export const isDateValid = (inputDate) => {
  const validDate = Date.parse(inputDate);
  return validDate;
};


export const getTodayDate = () => {
  const date = new Date();
  const todayDate = `${date.getFullYear()}-${ISOMonth[date.getMonth()]}-${date.getDate()}`;
  return todayDate;
};

export const setFutureDate = (numberOfDaysAhead) => {
  const todayDate = this.getTodayDate();
  // set the date for the return here..
  const futureDate = todayDate.setDate(todayDate.getDate() + numberOfDaysAhead);
  const newFutureDate = new Date(futureDate);
  const returnDate = `${newFutureDate.getFullYear()}
                    -${ISOMonth[newFutureDate.getMonth()]}-${newFutureDate.getDate()}`;
  return returnDate;
};
