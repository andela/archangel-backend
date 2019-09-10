/* eslint-disable import/named */
/* eslint-disable require-jsdoc */

import models from '../database/models';

const { notifications } = models;


export const getAllNotification = async(req, res) => {
    try {
        const user_id = req.users.id;
        const allRequests = await notifications.findAll({ where: { receiver: user_id } });
        return res.status(200).json({ status: 200, data: allRequests });
    } catch (error) {
        res.status(500).json({ status: 500, error });
    }
};

export const readAllNotification = async(req, res) => {
    try {
        const user_id = req.user.id;
        const allRequestsByUser = await notifications.update({ is_read: true }, {
            where: {
                receiver: user_id
            }
        });
        return res.status(200).json({ status: 200, data: allRequestsByUser });
    } catch (error) {
        res.status(500).json({ status: 500, error });
    }
};
