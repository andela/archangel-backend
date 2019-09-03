// This function handles messages
export default {
    defaultWelcome: [
        'Welcome to Barefoot Nomad server.',
        'use /api/v1 as the base path url for the APIs of this app.',
    ],
    welcome: 'Welcome to Archangel Barefoot Nomad Web App API.',
    signupSuccess: (email) => `You have successfully registered with this email, ${email}.`,

    // sign-up validation messages
    invalidEmail: 'Please, enter a valid email address.',
    usedEmail: (email) => `User with this email (${email}) already exist.`,
    shortPassword: 'The length of the password must be 8 and above.',
    noDigitInPassword: 'Password must contain at least one digit.',
    emptyFirstname: 'First name cannot be empty.',
    emptyLastname: 'Last name cannot be empty.',

    unauthorized: 'Not authorized.',
    invalidToken: 'Invalid Token, please login.',

    logoutSuccess: 'Logged out successfully.',

    // comment messages
    successComment: 'You have successfully commented on a travel request.',
    unregisteredEmail: (email) => `User with this email (${email}) not found in our database.`,
    emptyEmail: 'Email cannot be empty.',
    invalidTravel: 'The travel ID must be an integer value.',
    nonExistentTravel: 'The travel request does not exist.',
    emptyComment: 'comment cannot be empty.'
};
