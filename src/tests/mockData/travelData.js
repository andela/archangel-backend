var presentDate = new Date();
var todayDate = `${presentDate.getFullYear()}-${presentDate.getMonth() + 1}-${presentDate.getDate()}`;

//set the date for the return here..
var futureDate = presentDate.setDate(presentDate.getDate() + 4);
var newFutureDate = new Date(futureDate);
var returnDate = `${newFutureDate.getFullYear()}-${newFutureDate.getMonth() + 1}-${newFutureDate.getDate()}`;

export default {
  returnTripTestData : {
    user_id: 1,
    travel_type: 'return-trip',
    origin: 'Lagos',
    destination: 'Calabar',
    departure_date: todayDate,
    return_date: returnDate,
    travel_purpose: 'Business idea..',
    accommodation_id: 1,
    multi_city: false,
  }
}
