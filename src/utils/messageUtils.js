// This function handles messages
export default {
    defaultWelcome: [
        'Welcome to Barefoot Nomad server.',
        'use /api/v1 as the base path url for the APIs of this app.',
    ],
    welcome: 'Welcome to Archangel Barefoot Nomad Web App API.',
    signupSuccess: (email) => `You have successfully registered with this email, ${email}.`,
    // Travel requests messages
    oneWayTripCreated: 'Your request has been successfully created',
    managerApproval: (pendingReq) => `You have ${pendingReq} requests requiring your approval`,
    managerNotFound: "Manager's detail missing",
    requestNotOpen: 'Your request is no longer open for editing.',
    requestUpdated: 'Your request has been successfully updated',
    noEmail: 'Email cannot be empty.',
    userApproval: 'Here are your request status',
    // sign-up validation messages
    invalidEmail: 'Please, enter a valid email address.',
    usedEmail: (email) => `User with this email (${email}) already exist.`,
    shortPassword: 'The length of the password must be 8 and above.',
    noDigitInPassword: 'Password must contain at least one digit.',
    commentNotFound: 'The comment does not exist.',
    dateForFuture: 'Please enter a date greater than the departure date for return date.',
    dateForToday: "Please your departure date must be equal to or greater than today's date.",
    deleteComment: 'Comment successfully deleted.',
    diffDepartment: 'You are not in the same department as the Travel Requester.',
    emptyAccommodation: 'You must select an accommodation.',
    emptyComment: 'comment cannot be empty.',
    emptyDepartureDate: 'You must state your departure date',
    emptyDestination: 'You must state your destination',
    emptyEmail: 'Email cannot be empty.',
    emptyFirstname: 'First name cannot be empty.',
    emptyLastname: 'Last name cannot be empty.',
    emptyOrigin: 'You must state your current city.',
    emptyReturnDate: 'You must state your return date',
    emptyTravelPurpose: 'You must state your travel purpose',
    emptyTravelType: 'Sorry, travel type can not be empty.',
    notifyUser: 'Your travel request has been successfully created and it is awaiting approval',
    lineManager: 'Line manager must be present to continue',
    incorrectPassword: 'Sorry, the password entered is not correct.',
    isNotInteger: 'You must enter a valid integer type.',
    isNotISODate: "Your date must be of ISO8601 standard '2019-01-10'.",
    invalidToken: 'Invalid Token, please login.',
    invalidTravelType: 'Sorry you can only make return trip request here.',
    invalidTravelId: 'The travel ID must be an integer value.',
    invalidUserId: 'Sorry you can only create the request with the id of the logged in user.',
    lettersAlone: 'Only letters are allowed',
    loginSuccess: 'You have been logged in sucessfully.',
    logoutSuccess: 'Logged out successfully.',
    nonExistentTravel: 'The travel request does not exist.',
    requestNotPending: 'This Travel Request is not Pending.',
    returnTripCreated: 'Your return trip request was created successfully.',
    // comment messages
    successComment: [
        'You have successfully commented on a travel request.',
        'You have successfully retrieved all comments for this travel request.',
    ],
    travelNotFound: 'The travel request does not exist.',
    unauthorized: 'Not authorized.',
    unauthorizedAccessToTravel: 'Access denied. Accessible only by travel requester or his/her line manager.',
    unauthorizedCommentDelete: "comment can only be deleted by it's author",
    successfullyApproval: (requester) => `You have successfully approved a travel request from ${requester}.`,
    userEmailNotFound: (email) => `Sorry, there is no user with email ${email} in the database.`,
    userIdNotFound: (id) => `Sorry, there is no user with id: ${id} in the database.`,
    unregisteredEmail: (email) => `User with this email (${email}) not found in our database.`,
    wrongRole: (role) => `Sorry, you are not a/an ${role}.`,

    newFeedback: (accomm) => `You have successfully dropped a feedback on our accomodation facility with name, ${accomm}.`,
    getFeedback: (accomm) => `You have successfully retrieved feedback on our accommodation facility with name, ${accomm}.`,
    accommodationNotFound: 'The accommodation facility does not exist.',
    invalidAccommodationId: 'The Accommodation ID must be an integer value.',
    emptyFeedback: 'Feedback field cannot be empty.',
};
