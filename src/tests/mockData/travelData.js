const ISOMonth = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12];

var presentDate = new Date();
var todayDate = `${presentDate.getFullYear()}-${ISOMonth[presentDate.getMonth()]}-${presentDate.getDate()}`;

//set the date for the return here..
var futureDate = presentDate.setDate(presentDate.getDate() + 4);
var newFutureDate = new Date(futureDate);
var returnDate = `${newFutureDate.getFullYear()}-${ISOMonth[newFutureDate.getMonth()]}-${newFutureDate.getDate()}`;

export default {
  returnTripTestData : {
    user_id: 3,
    travel_type: 'return',
    origin: 'Lagos',
    destination: 'Calabar',
    departure_date: todayDate,
    return_date: returnDate,
    travel_purpose: 'Business idea..',
    accommodation_id: 1,
    multi_city: false,
  }
}
