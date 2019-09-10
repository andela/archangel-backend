import Model from '../database/models';

const { notifications } = Model;

// eslint-disable-next-line import/prefer-default-export
export const createNotification = async(notifications) => {
    try {
        const makeNotification = await notifications.create(notifications);
        return makeNotification;
    } catch (error) {
        return false;
    }
};

export const getSpecificTrips = async(id) => {
    try {
        const theTravels = await notifications.findOne({
            where: { line_manager_id: id }
        });
        return theTravels;
    } catch (error) {
        return false;
    }
}