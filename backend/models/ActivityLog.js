const db = require('../database/config');

const ActivityLog = {

    async getAll() {

        const [rows] = await db.query(
            `
            SELECT activity_logs.*, users.name
            FROM activity_logs
            JOIN users
            ON users.id = activity_logs.user_id
            ORDER BY activity_logs.created_at DESC
            `
        );

        return rows;

    },

    async create(data) {

        const {
            user_id,
            activity
        } = data;

        const [result] = await db.query(
            `
            INSERT INTO activity_logs
            (
                user_id,
                activity
            )
            VALUES (?, ?)
            `,
            [
                user_id,
                activity
            ]
        );

        return result;

    }

};

module.exports = ActivityLog;