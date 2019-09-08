import auth from './authRoutes';
import travel from './travelRoute';

export default (prefix, app) => {
    app.use(prefix, auth);
    app.use(prefix, travel);
};
