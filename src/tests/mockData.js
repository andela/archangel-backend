// Test user for sign-up functionality
const newUser = {
  first_name: 'Emma',
  last_name: 'Korede',
  email: 'emma.k@yahoo.com',
  password: 'testing123',
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
  departure_date: '2019-12-12',
  travel_purpose: 'This is a one way trip',
  accommodation_id: 1653453,
};
const validTravelId = '1891029';

// Test comment
const testComment = {
  comment: 'sample comment on travel request for testing',
};

const validCommentId = '554455';

const travelRequest = {
  origin: 'Lagos',
  destination: 'Kigali',
  departure_date: '2019-12-12',
  travel_purpose: 'This is a one way trip',
  accommodation_id: 1653453
};

const approvedRequest = {
  origin: 'Lagos',
  destination: 'Bauchi',
  departure_date: '2019-12-12',
  travel_purpose: 'This is a one way trip',
  accommodation_id: 1653453,
  approval_status: 'accepted'
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
  travelRequest,
  approvedRequest
};
