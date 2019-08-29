import auth from './authRoutes';

export default (prefix, app) => {
    app.use(prefix, auth);
};