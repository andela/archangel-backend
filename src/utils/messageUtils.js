// This function handles messages
export default {
    defaultWelcome: [
        'Welcome to Barefoot Nomad server.',
        'use /api/v1 as the base path url for the APIs of this app.',
    ],
    welcome: 'Welcome to Archangel Barefoot Nomad Web App API.',
    signupSuccess: (email) => `You have successfully registered with this email, ${email}.`,
    oneWayTripCreated: 'Your request has been successfully created',
    managerApproval: 'These request(s) require your approval',
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
    userIdNotFound: (id) => `Sorry, there is no user with id: ${id} in the database.`
};
