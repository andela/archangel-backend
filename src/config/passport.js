import FacebookStrategy from 'passport-facebook';
import { Strategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { signupService, findUserById } from '../services/authServices';

dotenv.config()

const fbStrategy = new FacebookStrategy({
  clientID: '521471335085949',
  clientSecret: 'c2c3ecee71b0c551da16ab1e583bd4f9',
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
},

async (accessToken, refreshToken, profile, cb) => {
  try {
    const email = profile.emails? profile.emails[0].value : null;
    const { id } = profile;
    const userExists = await findUserById(id);

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
      role: 'user'
    };

    await signupService(newUser);

    return cb(null, newUser);
  } catch (err) {
    return cb(err, false);
  }
});

const googleStrategy = new Strategy({
  clientID: '1067398423034-4v8un608vocv9fq87h6gr9gigh6v640d.apps.googleusercontent.com',
  clientSecret: 'OfhuKVyTG5Ug8N4RSkMfh3HN',
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
},

async (accessToken, refreshToken, profile, cb) => {
  try {
    const email = profile.emails[0].value;
    const { id } = profile;
    // check if user in database
    const userExists = await findUserById(id);

    if (userExists) {
      return cb(null, userExists);
    }

    const newUser = {
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email,
      id,
      role: 'user'
    };
    // store in database
    await signupService(newUser);

    return cb(null, newUser);
  } catch (err) {
    return cb(err, false);
  }
});

export { fbStrategy, googleStrategy };
