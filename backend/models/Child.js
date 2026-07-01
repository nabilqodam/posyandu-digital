const db = require('../database/config');

const Child = {

    async getAll() {

        const [rows] = await db.query(`
            SELECT
                c.*,
                u.name AS parent_name,

                gr.id AS growth_id,
                gr.weight,
                gr.height,
                gr.age_month,

                ns.weight_zscore,
                ns.nutrition_status,
                ns.height_zscore,
                ns.stunting_status

            FROM children c

            JOIN users u
                ON u.id = c.user_id

            LEFT JOIN growth_records gr
                ON gr.id = (
                    SELECT id
                    FROM growth_records
                    WHERE child_id = c.id
                    ORDER BY id DESC
                    LIMIT 1
                )

            LEFT JOIN nutrition_status ns
                ON ns.growth_id = gr.id

            ORDER BY c.id DESC
        `);

        return rows;

    },

    async getById(id) {

        const [rows] = await db.query(`
            SELECT
                c.*,
                u.name AS parent_name,

                gr.id AS growth_id,
                gr.weight,
                gr.height,
                gr.age_month,

                ns.weight_zscore,
                ns.nutrition_status,
                ns.height_zscore,
                ns.stunting_status

            FROM children c

            JOIN users u
                ON u.id = c.user_id

            LEFT JOIN growth_records gr
                ON gr.id = (
                    SELECT id
                    FROM growth_records
                    WHERE child_id = c.id
                    ORDER BY id DESC
                    LIMIT 1
                )

            LEFT JOIN nutrition_status ns
                ON ns.growth_id = gr.id

            WHERE c.id = ?
        `, [id]);

        return rows[0];

    },

    async getByParent(userId) {

        const [rows] = await db.query(`
            SELECT
                c.*,

                gr.weight,
                gr.height,
                gr.age_month,

                ns.weight_zscore,
                ns.nutrition_status,
                ns.height_zscore,
                ns.stunting_status

            FROM children c

            LEFT JOIN growth_records gr
                ON gr.id = (
                    SELECT id
                    FROM growth_records
                    WHERE child_id = c.id
                    ORDER BY id DESC
                    LIMIT 1
                )

            LEFT JOIN nutrition_status ns
                ON ns.growth_id = gr.id

            WHERE c.user_id = ?
        `,[userId]);

        return rows;

    },

    async create(data) {

        const {
            user_id,
            name,
            gender,
            birth_date
        } = data;
    
        const [result] =
            await db.query(
                `
                INSERT INTO children
                (
                    user_id,
                    name,
                    gender,
                    birth_date
                )
                VALUES (?, ?, ?, ?)
                `,
                [
                    user_id,
                    name,
                    gender,
                    birth_date
                ]
            );
    
        return result;
    },

    async update(id,data) {

        const {
            name,
            birth_date,
            gender
        } = data;

        const [result] = await db.query(
            `
            UPDATE children
            SET
                name=?,
                birth_date=?,
                gender=?
            WHERE id=?
            `,
            [
                name,
                birth_date,
                gender,
                id
            ]
        );

        return result;

    },

    async delete(id) {

        const [result] = await db.query(
            'DELETE FROM children WHERE id=?',
            [id]
        );

        return result;

    }

};

module.exports = Child;