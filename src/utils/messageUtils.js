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
    incorrectPassword: 'Sorry, the password entered is not correct.',
    loginSuccess: 'You have been logged in sucessfully.',
    signupSuccess: (email) => `You have successfully registered with this email, ${email}.`,
    userEmailNotFound: (email) => `Sorry, there is no user with email ${email} in the database.`,
    userIdNotFound: (id) => `Sorry, there is no user with id: ${id} in the database.`
};
