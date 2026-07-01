const db = require('../database/config');

const Notification = {

    async getByUser(userId) {

        const [rows] = await db.query(
            `
            SELECT *
            FROM notifications
            WHERE user_id = ?
            ORDER BY id DESC
            `,
            [userId]
        );

        return rows;

    },

    async create(data) {

        const {
            user_id,
            message
        } = data;

        const [result] = await db.query(
            `
            INSERT INTO notifications
            (
                user_id,
                message,
                is_read
            )
            VALUES (?, ?, ?)
            `,
            [
                user_id,
                message,
                0
            ]
        );

        return result;

    }

};

module.exports = Notification;