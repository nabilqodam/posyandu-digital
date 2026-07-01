const db = require('../database/config');

const getInterpretation =
    require('../helpers/interpretation');

const GrowthRecord = {

    async create(data) {

        const {
            child_id,
            age_month,
            period_month,
            weight,
            height
        } = data;

        const [result] = await db.query(
            `
            INSERT INTO growth_records
            (
                child_id,
                weight,
                height,
                age_month,
                period_month
            )
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                child_id,
                weight,
                height,
                age_month,
                period_month
            ]
        );

        return result;

    },

    async getAll() {

        const [rows] = await db.query(
            `
            SELECT
                growth_records.*,
                children.name as child_name,

                nutrition_status.weight_zscore,
                nutrition_status.nutrition_status,
                nutrition_status.height_zscore,
                nutrition_status.stunting_status

            FROM growth_records

            JOIN children
                ON children.id = growth_records.child_id

            LEFT JOIN nutrition_status
                ON nutrition_status.growth_id = growth_records.id

            ORDER BY growth_records.id DESC
            `
        );

        return rows.map(item => ({

            ...item,

            nutrition: {

                weight_zscore:
                    item.weight_zscore !== null
                        ? Number(item.weight_zscore)
                            .toFixed(2)
                        : null,

                nutrition_status:
                    item.nutrition_status,

                height_zscore:
                    item.height_zscore !== null
                        ? Number(item.height_zscore)
                            .toFixed(2)
                        : null,

                stunting_status:
                    item.stunting_status

            }

        }));

    },

    async getByChild(childId) {

        const [rows] = await db.query(
            `
            SELECT
                growth_records.*,
                children.name as child_name,

                nutrition_status.weight_zscore,
                nutrition_status.nutrition_status,
                nutrition_status.height_zscore,
                nutrition_status.stunting_status

            FROM growth_records

            JOIN children
                ON children.id = growth_records.child_id

            LEFT JOIN nutrition_status
                ON nutrition_status.growth_id = growth_records.id

            WHERE growth_records.child_id = ?

            ORDER BY growth_records.id DESC
            `,
            [childId]
        );

        return rows.map(item => ({

            ...item,

            nutrition: {

                weight_zscore:
                    item.weight_zscore !== null
                        ? Number(item.weight_zscore)
                            .toFixed(2)
                        : null,

                nutrition_status:
                    item.nutrition_status,

                height_zscore:
                    item.height_zscore !== null
                        ? Number(item.height_zscore)
                            .toFixed(2)
                        : null,

                stunting_status:
                    item.stunting_status,

                interpretation:
                    item.nutrition_status
                        ? getInterpretation(
                            item.nutrition_status,
                            item.weight_zscore
                        )
                        : null

            }

        }));

    },

    async getByChildAndPeriod(
        childId,
        periodMonth
    ) {

        const [rows] =
            await db.query(
                `
                SELECT *
                FROM growth_records
                WHERE child_id = ?
                AND period_month = ?
                LIMIT 1
                `,
                [
                    childId,
                    periodMonth
                ]
            );

        return rows[0];

    },

    async update(id, data) {

        const {
            weight,
            height,
            age_month,
            period_month
        } = data;

        const [result] = await db.query(
            `
            UPDATE growth_records
            SET
                weight = ?,
                height = ?,
                age_month = ?,
                period_month = ?
            WHERE id = ?
            `,
            [
                weight,
                height,
                age_month,
                period_month,
                id
            ]
        );

        return result;

    },

    async getById(id) {

        const [rows] = await db.query(
            `
            SELECT *
            FROM growth_records
            WHERE id = ?
            `,
            [id]
        );

        return rows[0];

    },

    async getByUser(userId) {

        const [rows] = await db.query(
            `
            SELECT
                growth_records.*,
                children.name as child_name,
    
                nutrition_status.weight_zscore,
                nutrition_status.nutrition_status,
                nutrition_status.height_zscore,
                nutrition_status.stunting_status
    
            FROM growth_records
    
            JOIN children
                ON children.id = growth_records.child_id
    
            LEFT JOIN nutrition_status
                ON nutrition_status.growth_id = growth_records.id
    
            WHERE children.user_id = ?
    
            ORDER BY growth_records.id DESC
            `,
            [userId]
        );
    
        return rows.map(item => ({
    
            ...item,
    
            nutrition: {
    
                weight_zscore:
                    item.weight_zscore !== null
                        ? Number(item.weight_zscore).toFixed(2)
                        : null,
    
                nutrition_status:
                    item.nutrition_status,
    
                height_zscore:
                    item.height_zscore !== null
                        ? Number(item.height_zscore).toFixed(2)
                        : null,
    
                stunting_status:
                    item.stunting_status
    
            }
    
        }));
    
    }

};

module.exports = GrowthRecord;