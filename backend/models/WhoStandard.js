const db = require('../database/config');

const WhoStandard = {

    async getStandard(
        age_month,
        gender
    ) {

        const [rows] = await db.query(
            `
            SELECT *
            FROM who_standards
            WHERE age_month = ?
            AND gender = ?
            `,
            [
                age_month,
                gender
            ]
        );

        return rows[0];

    },

    async getNearestStandard(
    age_month,
    gender,
    measurementType
) {

    const [rows] = await db.query(
        `
        SELECT *
        FROM who_standards
        WHERE gender = ?
        AND measurement_type = ?
        AND age_month <= ?
        ORDER BY age_month DESC
        LIMIT 1
        `,
        [
            gender,
            measurementType,
            age_month
        ]
    );

    return rows[0];

},

    async getByAgeGenderAndType(
    ageMonth,
    gender,
    measurementType
) {

    const [rows] = await db.query(
        `
        SELECT *
        FROM who_standards
        WHERE age_month = ?
        AND gender = ?
        AND measurement_type = ?
        LIMIT 1
        `,
        [
            ageMonth,
            gender,
            measurementType
        ]
    );

    return rows[0];

},

    async getAllByGender(
    gender,
    measurementType
) {

    const [rows] = await db.query(
        `
        SELECT
            age_month,
            l,
            m,
            s,
            sd3neg,
            sd2neg,
            sd1neg,
            sd0,
            sd1,
            sd2,
            sd3
        FROM who_standards
        WHERE gender = ?
        AND measurement_type = ?
        ORDER BY age_month ASC
        `,
        [
            gender,
            measurementType
        ]
    );

    return rows;

},

async getReferenceTable() {

    const [rows] = await db.query(`
        SELECT
            age_month,
            gender,
            measurement_type,
            sd2neg,
            sd2
        FROM who_standards
        ORDER BY
            measurement_type,
            gender,
            age_month ASC
    `);

    return rows;

}

};

module.exports = WhoStandard;