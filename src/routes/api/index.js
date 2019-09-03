import auth from './authRoutes';
import comment from './commentRoutes';

export default (prefix, app) => {
    app.use(prefix, auth);
    app.use(prefix, comment);
};
