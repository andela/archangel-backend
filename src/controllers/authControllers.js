import models from '../database/models';
import services from '../services/authServices';

const { blacklist } = models;
const { logoutService } = services;

export default {
    logout: async (req,res) => {
        try {
            const { token } = req;
            await logoutService(token);
            res.status(200)
            .send({
                statusCode: 200,
                message: 'Logged out successfully.'
            });
        } catch (err) {
            res.status(400)
            .send({
                statusCode: 400,
                error: err.message,
            });
        }
    },
};
