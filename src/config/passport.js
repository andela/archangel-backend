import FacebookStrategy from 'passport-facebook';
import { Strategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import authServices from '../services/authServices';

const { signupService, findUserById } = authServices;

dotenv.config()

const fbStrategy = new FacebookStrategy({
	clientID: process.env.FACEBOOK_CLIENT_ID,
	clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
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
	clientID: process.env.GOOGLE_CONSUMER_KEY,
	clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
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
