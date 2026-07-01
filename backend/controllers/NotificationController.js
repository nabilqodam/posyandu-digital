const Notification =
    require('../models/Notification');

const NotificationController = {

    async index(req, res) {

        try {

            const notifications =
                await Notification.getByUser(
                    req.user.id
                );

            res.json({
                data: notifications
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }

};

module.exports = NotificationController;