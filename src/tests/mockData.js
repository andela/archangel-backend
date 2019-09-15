const ISOMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12];

const presentDate = new Date();
const todayDate = `${presentDate.getFullYear()}-${ISOMonth[presentDate.getMonth()]}-${presentDate.getDate()}`;

// set the date for the return here..
const futureDate = presentDate.setDate(presentDate.getDate() + 4);
const newFutureDate = new Date(futureDate);
const returnDate = `${newFutureDate.getFullYear()}-${ISOMonth[newFutureDate.getMonth()]}-${newFutureDate.getDate()}`;

// Test user for sign-up functionality
const newUser = {
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
const testUser1 = {
  email: 'nancngo@gmail.com',
  password: 'testing123',
};

const testUser2 = {
  email: 'petchidi@yahoo.com',
  password: 'testing123',
};

const testManager1 = {
  email: 'rose.querty@yahoo.com',
  password: 'testing123',
};

const testManager2 = {
  email: 'm.benchfort@yahoo.com',
  password: 'testing123',
};

// Test Travel Request
const testTravelRequest = {
  origin: 'Lagos',
  destination: 'Kigali',
  departure_date: todayDate,
  travel_purpose: 'This is a one way trip',
  accommodation_id: 1653453,
};

const validTravelId = '1891029';

// Test comment
const testComment = {
  comment: 'sample comment on travel request for testing',
};

const validCommentId = '554455';

const returnTripTestData = {
  travel_type: 'return',
  origin: 'Lagos',
  destination: 'Calabar',
  departure_date: todayDate,
  return_date: returnDate,
  travel_purpose: 'Business idea return trip..',
  accommodation_id: 1653453,
  multi_city: false,
};

const approvedRequest = {
  origin: 'Lagos',
  destination: 'Bauchi',
  departure_date: '2019-12-12',
  travel_purpose: 'This is a one way trip',
  accommodation_id: 1653453,
  approval_status: 'accepted'
};

const validAccommodationId = '1653453';

const testFeedback = {
  feedback: 'sample feedback back on an accommodation facility.',
};
export {
  newUser,
  testUser1,
  testUser2,
  testManager1,
  testManager2,
  testTravelRequest,
  testComment,
  validTravelId,
  validCommentId,
  returnTripTestData,
  approvedRequest,
  validAccommodationId,
  testFeedback,
};

// updateProfile Data

export const userDetail = {
  first_name: 'myname',
  last_name: 'mylastname',
  email: 'mygmailis@gmail.com',
  password: 'protected123pass',
};
export const updateProfile = {
  first_name: 'myname',
  last_name: 'mylastname',
  address: '14 downtown road',
  preferred_lang: 'English',
  preferred_currency: 'Dollars',
  gender: 'Female'
};

