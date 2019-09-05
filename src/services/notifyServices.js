import Model from '../database/models';

const { departments, travels, notifications } = Model;

/**
 * 
 * 
 * @class notifyService 
 */
class notifyServices {
    /**
     * 
     * 
     * @static
     * @param {object} newNotification
     * @return {object} alreadyCreatedNotification
     * @memberof notifyServices
     */
    static async createNotification(newNotification) {
        try {
            const alreadyCreatedNotification = await notifications.create(newNotification);
            return alreadyCreatedNotification;
        } catch (error) {
            return false;
        }
    }

    /**
     * 
     * @static
     * @param {Integer} id
     * @param {string} updatePassword
     * @returns {Object} users
     * @memberof notifyServices
     */
    static async getSpecificTravels(email) {
        try {
            const theTravels = await departments.findOne({
                where: { manager_email: email }
            });
            return theTravels;
        } catch (error) {
            return false;
        }
    }
}

export default notifyServices;
