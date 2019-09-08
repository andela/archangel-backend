import auth from './authRoutes';
import travel from './travelRoute';
<<<<<<< HEAD
import comment from './commentRoutes';


export default (prefix, app) => {
	app.use(prefix, auth);
	app.use(prefix, travel);
	app.use(prefix, comment);
=======

export default (prefix, app) => {
    app.use(prefix, auth);
    app.use(prefix, travel);
>>>>>>> ft(return-trip-request): implement the function for a user to be able to create a return trip
};
