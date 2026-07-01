const db = require('../database/config');

const Recommendation = {

    async getAll() {

        const [rows] = await db.query(
            `
            SELECT *
            FROM recommendations
            ORDER BY status ASC, category ASC
            `
        );

        return rows;

    },

    async getByStatus(status) {

        const [rows] = await db.query(
            `
            SELECT *
            FROM recommendations
            WHERE status = ?
            ORDER BY category ASC, id ASC
            `,
            [status]
        );

        return rows;

    }

};

module.exports = Recommendation;