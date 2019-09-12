// This function handles messages
export default {
  defaultWelcome: [
    'Welcome to Barefoot Nomad server.',
    'use /api/v1 as the base path url for the APIs of this app.',
  ],
  welcome: 'Welcome to Archangel Barefoot Nomad Web App API.',
  signupSuccess: (email) => `You have successfully registered with this email, ${email}.`,
  oneWayTripCreated: 'Your request has been successfully created',
  managerApproval: (pendingReq) => `You have ${pendingReq} requests requiring your approval`,
  managerNotFound: "Manager's detail missing",
  noEmail: 'Email cannot be empty.',
  // sign-up validation messages
  invalidEmail: 'Please, enter a valid email address.',
  usedEmail: (email) => `User with this email (${email}) already exist.`,
  shortPassword: 'The length of the password must be 8 and above.',
  noDigitInPassword: 'Password must contain at least one digit.',
  emptyFirstname: 'First name cannot be empty.',
  emptyLastname: 'Last name cannot be empty.',
  emptyOrigin: 'You must state your current city.',
  emptyDestination: 'You must state your destination',
  emptyDepartureDate: 'You must state your departure date',
  emptyReturnDate: 'You must state your return date',
  emptyTravelPurpose: 'You must state your travel purpose',
  lettersAlone: 'Only letters are allowed',
  unauthorized: 'Not authorized.',
  invalidToken: 'Invalid Token, please login.',
  logoutSuccess: 'Logged out successfully.',
  incorrectPassword: 'Sorry, the password entered is not correct.',
  loginSuccess: 'You have been logged in sucessfully.',
  userEmailNotFound: (email) => `Sorry, there is no user with email ${email} in the database.`,
  userIdNotFound: (id) => `Sorry, there is no user with id: ${id} in the database.`,

  // comment messages
  successComment: [
    'You have successfully commented on a travel request.',
    'You have successfully retrieved all comments for this travel request.',
  ],
  unregisteredEmail: (email) => `User with this email (${email}) not found in our database.`,
  emptyEmail: 'Email cannot be empty.',
  invalidTravelId: 'The travel ID must be an integer value.',
  travelNotFound: 'The travel request does not exist.',
  unauthorizedAccessToTravel:
    'Access denied. Accessible only by travel requester or his/her line manager.',
  emptyComment: 'comment cannot be empty.',
  unauthorizedCommentDelete: "comment can only be deleted by it's author",
  commentNotFound: 'The comment does not exist.',
  deleteComment: 'Comment successfully deleted.',

  //profile messages
  profilefetched: 'Profile rendered sucessfully',
  profileUpdated: 'Profile updated successfully'
};
