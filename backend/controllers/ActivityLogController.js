const ActivityLog =
    require('../models/ActivityLog');

const ActivityLogController = {

    async index(req, res) {

        try {

            const logs =
                await ActivityLog.getAll();

            res.json({
                data: logs
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }

};

module.exports = ActivityLogController;