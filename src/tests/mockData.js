const ISOMonth = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12];

var presentDate = new Date();
var todayDate = `${presentDate.getFullYear()}-${ISOMonth[presentDate.getMonth()]}-${presentDate.getDate()}`;

//set the date for the return here..
var futureDate = presentDate.setDate(presentDate.getDate() + 4);
var newFutureDate = new Date(futureDate);
var returnDate = `${newFutureDate.getFullYear()}-${ISOMonth[newFutureDate.getMonth()]}-${newFutureDate.getDate()}`;

// Test user for sign-up functionality
export const newUser = {
  first_name: 'Emma',
  last_name: 'Korede',
  email: 'emma.k@yahoo.com',
  password: 'testing123',
};

export const user = {
  first_name: 'myname',
  last_name: 'mylastname',
  email: 'mygmailis@gmail.com',
  password: 'protected123pass',
};
// Test Users for Login functionality and other tests that requires a logged in user
export const testUser1 = {
  email: 'nancngo@gmail.com',
  password: 'testing123',
};

export const testUser2 = {
  email: 'petchidi@yahoo.com',
  password: 'testing123',
};

export const testManager1 = {
  email: 'rose.querty@yahoo.com',
  password: 'testing123',
};

export const testManager2 = {
  email: 'm.benchfort@yahoo.com',
  password: 'testing123',
};

// Test Travel Request
export const testTravelRequest = {
  origin: 'Lagos',
  destination: 'Kigali',
  departure_date: todayDate,
  travel_purpose: 'This is a one way trip',
  accommodation_id: 1653453,
};
export const validTravelId = '1891029';

// Test comment
export const testComment = {
  comment: 'sample comment on travel request for testing',
};

export const validCommentId = '554455';

export const returnTripTestData = {
  travel_type: 'return',
  origin: 'Lagos',
  destination: 'Calabar',
  departure_date: todayDate,
  return_date: returnDate,
  travel_purpose: 'Business idea return trip..',
  accommodation_id: 1653453,
  multi_city: false,
};
