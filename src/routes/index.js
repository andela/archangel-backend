import auth from './authRoutes';
import travel from './travelRoute';
import comment from './commentRoutes';
import notification from './notificationRoutes';
import accommodationFeedback from './accommodationFeedbackRoutes';

export default (prefix, app) => {
  app.use(prefix, auth);
  app.use(prefix, travel);
  app.use(prefix, comment);
  app.use(prefix, notification);
  app.use(prefix, accommodationFeedback);
};
