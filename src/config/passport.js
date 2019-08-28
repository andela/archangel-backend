import FacebookStrategy from 'passport-facebook';
import { Strategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import user from '../database/models/user';

dotenv.config()

const findUser = async (id) => {
  try {
    const userExists = await user.findAll({
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
    await user.create(newUser);

  } catch (err) {
    return err;
  }
};

const fbStrategy = new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
},

async (accessToken, refreshToken, profile, cb) => {
  try {
    const email = profile.emails? profile.emails[0].value : null;
    const { id } = profile;
    let userExists = await findUser(id);

    if (userExists) {
      return cb(null, userExists);
    }

    const { displayName } = profile;
    const [lastName, firstName] = displayName.split(' ');

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      id,
    };

    await createUser(newUser);

    return cb(null, newUser);
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
    let userExists = await findUser(id);

    if (userExists) {
      return cb(null, userExists);
    }

    const newUser = {
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email,
      id,
    };
    // store in database
    createUser(newUser);

    return cb(null, newUser);
  } catch (err) {
    return cb(err, false);
  }
});

export { fbStrategy, googleStrategy };
