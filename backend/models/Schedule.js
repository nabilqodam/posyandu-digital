const db = require('../database/config');

const Schedule = {

    async create(data) {

        const {
            title,
            schedule_date,
            start_time,
            end_time,
            activity,
            created_by
        } = data;

        const [result] = await db.query(
            `
            INSERT INTO schedules
            (
                title,
                schedule_date,
                start_time,
                end_time,
                activity,
                created_by
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                title,
                schedule_date,
                start_time,
                end_time,
                activity,
                created_by
            ]
        );

        return result;

    },
    
    async deleteExpired() {

        const [result] = await db.query(
            `
            DELETE FROM schedules
            WHERE schedule_date < CURDATE()
            `
        );
    
        return result;
    
    },

    async getAll() {

        const [rows] = await db.query(
            `
            SELECT
                schedules.*,
                users.name as created_by_name
            FROM schedules
            JOIN users
                ON users.id = schedules.created_by
            ORDER BY schedules.schedule_date DESC
            `
        );

        return rows;

    },

    async getById(id) {

        const [rows] = await db.query(
            `
            SELECT
                schedules.*,
                users.name as created_by_name
            FROM schedules
            JOIN users
                ON users.id = schedules.created_by
            WHERE schedules.id = ?
            `,
            [id]
        );

        return rows[0];

    },

    async update(id, data) {

        const {
            title,
            schedule_date,
            start_time,
            end_time,
            activity
        } = data;

        const [result] = await db.query(
            `
            UPDATE schedules
            SET
                title = ?,
                schedule_date = ?,
                start_time = ?,
                end_time = ?,
                activity = ?
            WHERE id = ?
            `,
            [
                title,
                schedule_date,
                start_time,
                end_time,
                activity,
                id
            ]
        );

        return result;

    },

    async delete(id) {

        const [result] = await db.query(
            `
            DELETE FROM schedules
            WHERE id = ?
            `,
            [id]
        );

        return result;

    }

};

module.exports = Schedule;