/* eslint-disable import/named */
/* eslint-disable require-jsdoc */

import models from '../models';

const { notifications } = models;


class NotificationController {
    /**
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} the all requests
     * @description get all notification
     */
    static async getAllNotification(req, res) {
        try {
            const userId = req.user.id;
            const allRequests = await notifications.findAll({ where: { receiver: userId } });
            return res.status(200).json({ status: 200, data: allRequests });
        } catch (error) {
            res.status(500).json({ status: 500, error });
        }
    }

    static async readAllNotification(req, res) {
        try {
            const userId = req.user.id;
            const allRequestsByUser = await notifications.update({ isRead: true }, {
                where: {
                    receiver: userId
                }
            });
            return res.status(200).json({ status: 200, data: allRequestsByUser });
        } catch (error) {
            res.status(500).json({ status: 500, error });
        }
    }
}

export default NotificationController;
