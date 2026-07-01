// models/Interpretation.js

const db = require("../database/config");

const Interpretation = {

    async getByStatus(status) {

        const [rows] =
            await db.query(
                `
                SELECT *
                FROM interpretations
                WHERE status = ?
                LIMIT 1
                `,
                [status]
            );

        return rows[0];

    }

};

module.exports =
    Interpretation;