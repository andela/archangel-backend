const messages = {
  defaultWelcome: [
    'Welcome to Barefoot Nomad server.',
    'use /api/v1 as the base path url for the APIs of this app.',
  ],
  welcome: 'Welcome to Archangel Barefoot Nomad Web App API.',
  incorrectPassword: 'Sorry, the password entered is not correct.',
  userEmailNotFound: (email) => { return `Sorry, there is no user with email: ${email} in the database.` },
  userIdNotFound: (id) => { return `Sorry, there is no user with id: ${id} in the database.` },
  loginSuccess: 'You have been logged in sucessfully.'
}


export default messages;
