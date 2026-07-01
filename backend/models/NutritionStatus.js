const db =
    require('../database/config');

const NutritionStatus = {

    async create(data) {

        const {
            growth_id,
            weight_zscore,
            nutrition_status,
            height_zscore,
            stunting_status
        } = data;

        const [result] = await db.query(
            `
            INSERT INTO nutrition_status
            (
                growth_id,
                weight_zscore,
                nutrition_status,
                height_zscore,
                stunting_status
            )
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                growth_id,
                weight_zscore,
                nutrition_status,
                height_zscore,
                stunting_status
            ]
        );

        return result;

    },

    async updateByGrowthId(
        growthId,
        data
    ) {

        const {
            weight_zscore,
            nutrition_status,
            height_zscore,
            stunting_status
        } = data;

        const [result] =
            await db.query(
                `
                UPDATE nutrition_status
                SET
                    weight_zscore = ?,
                    nutrition_status = ?,
                    height_zscore = ?,
                    stunting_status = ?
                WHERE growth_id = ?
                `,
                [
                    weight_zscore,
                    nutrition_status,
                    height_zscore,
                    stunting_status,
                    growthId
                ]
            );

        return result;

    },

    async getByGrowth(growthId) {

        const [rows] = await db.query(
            `
            SELECT *
            FROM nutrition_status
            WHERE growth_id = ?
            `,
            [growthId]
        );

        return rows[0];

    },

    async getAll() {

        const [rows] = await db.query(
            `
            SELECT
                nutrition_status.*,
                growth_records.child_id,
                growth_records.weight,
                growth_records.height,
                growth_records.age_month,
                children.name as child_name
            FROM nutrition_status
            JOIN growth_records
                ON growth_records.id = nutrition_status.growth_id
            JOIN children
                ON children.id = growth_records.child_id
            ORDER BY nutrition_status.id DESC
            `
        );

        return rows;

    },

    async getByChild(childId) {

        const [rows] = await db.query(
            `
            SELECT
                nutrition_status.*,
                growth_records.child_id,
                growth_records.weight,
                growth_records.height,
                growth_records.age_month,
                children.name as child_name
            FROM nutrition_status
            JOIN growth_records
                ON growth_records.id = nutrition_status.growth_id
            JOIN children
                ON children.id = growth_records.child_id
            WHERE growth_records.child_id = ?
            ORDER BY nutrition_status.id DESC
            `,
            [childId]
        );

        return rows;

    },

    

    async getByUser(userId) {

        const [rows] = await db.query(
            `
            SELECT
                nutrition_status.*,
                growth_records.child_id,
                growth_records.weight,
                growth_records.height,
                growth_records.age_month,
                children.name as child_name
            FROM nutrition_status
            JOIN growth_records
                ON growth_records.id = nutrition_status.growth_id
            JOIN children
                ON children.id = growth_records.child_id
            WHERE children.user_id = ?
            ORDER BY nutrition_status.id DESC
            `,
            [userId]
        );
    
        return rows;
    
    },

    async getGrowthTrend() {

        const [rows] = await db.query(`
            SELECT
                gr.period_month AS month,

                SUM(
                    ns.nutrition_status = 'normal'
                ) AS normal,

                SUM(
                    ns.nutrition_status = 'gizi_kurang'
                ) AS gizi_kurang,

                SUM(
                    ns.nutrition_status = 'gizi_lebih'
                ) AS gizi_lebih,

                SUM(
                    ns.stunting_status IN (
                        'stunting',
                        'severe_stunting'
                    )
                ) AS stunting

            FROM nutrition_status ns

            JOIN growth_records gr
                ON gr.id = ns.growth_id

            GROUP BY gr.period_month

            ORDER BY gr.period_month ASC
        `);

        return rows;
    },

    async getGrowthChart(childId) {

        const [rows] = await db.query(`
            SELECT
                gr.period_month,
                gr.age_month,
                gr.weight,
                gr.height,

                ns.weight_zscore,
                ns.height_zscore,

                c.gender

            FROM growth_records gr

            JOIN nutrition_status ns
                ON ns.growth_id = gr.id

            JOIN children c
                ON c.id = gr.child_id

            WHERE gr.child_id = ?

            ORDER BY gr.period_month ASC
        `,[childId]);

        return rows;
    },

    async getLatestByChild(childId) {

    const [rows] = await db.query(`
        SELECT
            nutrition_status.*,

            growth_records.child_id,
            growth_records.age_month,
            growth_records.weight,
            growth_records.height,
            growth_records.period_month,

            children.name AS child_name

        FROM nutrition_status

        JOIN growth_records
            ON growth_records.id =
            nutrition_status.growth_id

        JOIN children
            ON children.id =
            growth_records.child_id

        WHERE growth_records.child_id = ?

        ORDER BY
            growth_records.period_month DESC,
            nutrition_status.id DESC

        LIMIT 1
    `,[childId]);

    return rows[0];

},

async getDashboardStatsByMonth(month, year) {

    // TOTAL SEMUA BALITA TERDAFTAR
    const [children] =
        await db.query(`
            SELECT COUNT(*) total
            FROM children
        `);

    const totalRegistered =
        children[0].total;

    // BALITA YANG DITIMBANG PADA BULAN TERPILIH
    const [updated] =
        await db.query(`
            SELECT COUNT(
                DISTINCT child_id
            ) total
            FROM growth_records
            WHERE MONTH(created_at)=?
            AND YEAR(created_at)=?
        `,[month, year]);

    const weighedChildren =
        updated[0].total;

    // STATUS TERAKHIR PADA BULAN TERPILIH
    const [latestStatus] =
        await db.query(`
            SELECT
                c.id,
                ns.nutrition_status,
                ns.stunting_status

            FROM children c

            JOIN growth_records gr
            ON gr.id = (
                SELECT id
                FROM growth_records g2

                WHERE g2.child_id = c.id
                AND MONTH(g2.created_at)=?
                AND YEAR(g2.created_at)=?

                ORDER BY g2.created_at DESC,
                         g2.id DESC
                LIMIT 1
            )

            JOIN nutrition_status ns
            ON ns.growth_id = gr.id
        `,[month, year]);

    let normal = 0;
    let riskStunting = 0;
    let nutritionProblem = 0;

    latestStatus.forEach(item => {

        if (
            item.nutrition_status === "normal" &&
            item.stunting_status === "normal"
        ) {
            normal++;
        }

        if (
            item.stunting_status === "stunting" ||
            item.stunting_status === "severe_stunting" ||
            item.stunting_status === "tinggi_berlebih"
        ) {
            riskStunting++;
        }

        if (
            item.nutrition_status === "gizi_kurang" ||
            item.nutrition_status === "gizi_lebih"
        ) {
            nutritionProblem++;
        }

    });

    return {

        // TOTAL SEMUA BALITA
        total_registered:
            totalRegistered,

        // YANG DITIMBANG BULAN INI
        total_children:
            weighedChildren,

        // NORMAL
        normal_growth:
            normal,

        // RISIKO STUNTING
        risk_stunting:
            riskStunting,

        // MASALAH BB/U
        nutrition_problem:
            nutritionProblem,

        // BELUM DITIMBANG BULAN INI
        not_updated:
            totalRegistered - weighedChildren

    };

},

    async getDashboardStats() {

        // total balita
        const [totalChildren] = await db.query(
            `
            SELECT COUNT(*) as total
            FROM children
            `
        );

        // pertumbuhan normal
        const [normal] =
        await db.query(`
            SELECT COUNT(*) total
            FROM nutrition_status
            WHERE nutrition_status = 'normal'
            AND stunting_status = 'normal'
        `);

        // gizi lebih
        const [overNutrition] = await db.query(
            `
            SELECT COUNT(*) as total
            FROM nutrition_status
            WHERE nutrition_status = 'gizi_lebih'
            `
        );

        // risiko stunting
        const [riskStunting] = await db.query(
            `
            SELECT COUNT(*) as total
            FROM nutrition_status
            WHERE stunting_status = 'stunting'
            `
        );

        // stunting berat
        const [severeStunting] = await db.query(
            `
            SELECT COUNT(*) as total
            FROM nutrition_status
            WHERE stunting_status = 'severe_stunting'
            `
        );

        return {

            total_children:
                totalChildren[0].total,

            normal_growth:
                normal[0].total,

            risk_stunting:
                riskStunting[0].total,

            severe_stunting:
                severeStunting[0].total,

                over_nutrition:
                overNutrition[0].total

        };

    }

};

module.exports = NutritionStatus;