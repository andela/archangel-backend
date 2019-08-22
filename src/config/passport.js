import FacebookStrategy from 'passport-facebook';
import { Strategy } from 'passport-google-oauth20';

const userDb = {
// soon to be replaced dummy database
};

const findUser = async (id) => {
  try {
    const userExists = await userDb.findAll({
      where: {
        id,
      },
    });

    return userExists;
  } catch (err) {
    return null;
  }
};

const createUser = async (newUser) => {
  try {
    const user = await userDb.create(newUser);

    return user.id;
  } catch (err) {
    return null;
  }
};

const fbStrategy = new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
},

async (accessToken, refreshToken, profile, cb) => {
  try {
    const email = profile.emails[0].value;
    const { id } = profile;
    let user = await findUser(id);

    if (user) {
      return cb(null, user);
    }

    const { displayName } = profile;
    const [lastName, firstName] = displayName.split(' ');

    user = {
      first_name: firstName,
      last_name: lastName,
      email,
      id,
    };

    createUser(user);

    return cb(null, user);
  } catch (err) {
    return cb(err, false);
  }
});

const googleStrategy = new Strategy({
  clientID: process.env.GOOGLE_CONSUMER_KEY,
  clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
},

async (accessToken, refreshToken, profile, cb) => {
  try {
    const email = profile.emails[0].value;
    const { id } = profile;
    // check if user in database
    let user = await findUser(id);

    if (user) {
      return cb(null, user);
    }

    user = {
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email,
      id,
    };
    // store in database
    createUser(user);

    return cb(null, user);
  } catch (err) {
    return cb(err, false);
  }
});

export { fbStrategy, googleStrategy };
