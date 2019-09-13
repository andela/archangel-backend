import Model from '../models';

const { notifications } = Model;

// eslint-disable-next-line import/prefer-default-export
export default {

  createNotification: async () => {
    try {
      const makeNotification = await notifications.create(notifications);
      return makeNotification;
    } catch (error) {
      return false;
    }
  },

  getSpecificTrips: async (id) => {
    try {
      const theTravels = await notifications.findOne({
        where: { line_manager_id: id }
      });
      return theTravels;
    } catch (error) {
      return false;
    }
  },
};
