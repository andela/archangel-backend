// This function handles messages
export default {
	defaultWelcome: [
		'Welcome to Barefoot Nomad server.',
		'use /api/v1 as the base path url for the APIs of this app.',
	],
	dateForFuture: 'Please enter a date greater than the departure date for return date.',
	dateForToday: 'Please enter the correct date of today.',
	welcome: 'Welcome to Archangel Barefoot Nomad Web App API.',

	// sign-up validation messages
	emptyAccommodation: 'You must select an accommodation.',
	emptyComment: 'comment cannot be empty.',
	emptyEmail: 'Email cannot be empty.',
	emptyFirstname: 'First name cannot be empty.',
	emptyLastname: 'Last name cannot be empty.',
	emptyOrigin: 'You must state your current city.',
	emptyDestination: 'You must state your destination',
	emptyDepartureDate: 'You must state your departure date',
	emptyReturnDate: 'You must state your return date',
	emptyTravelPurpose: 'You must state your travel purpose',
	emptyTravelType: 'Sorry, travel type can not be empty.',
	isNotInteger: 'You must enter a valid integer type.',
	invalidEmail: 'Please, enter a valid email address.',
	invalidToken: 'Invalid Token, please login.',
	invalidTravelType: 'Sorry you can only make return trip request here.',
	invalidTravelId: 'The travel ID must be an integer value.',
	invalidUserId:'Sorry you can only create the request with the id of the logged in user.',
	noDigitInPassword: 'Password must contain at least one digit.',
	nonExistentTravel: 'The travel request does not exist.',
	lettersAlone: 'Only letters are allowed',
	incorrectPassword: 'Sorry, the password entered is not correct.',
	loginSuccess: 'You have been logged in sucessfully.',
	logoutSuccess: 'Logged out successfully.',
	noEmail: 'Email cannot be empty.',
	oneWayTripCreated: 'Your request has been successfully created',
	returnTripCreated: 'Your return trip request was created successfully.',
	signupSuccess: (email) => `You have successfully registered with this email, ${email}.`,
	// comment messages
	shortPassword: 'The length of the password must be 8 and above.',
	successComment: [
		'You have successfully commented on a travel request.',
		'You have successfully retrieved all comments for this travel request.',
	],
	unauthorized: 'Not authorized.',
	usedEmail: (email) => `User with this email (${email}) already exist.`,
	userEmailNotFound: (email) => `Sorry, there is no user with email ${email} in the database.`,
	userIdNotFound: (id) => `Sorry, there is no user with id: ${id} in the database.`,
	unregisteredEmail: (email) => `User with this email (${email}) not found in our database.`,
};
