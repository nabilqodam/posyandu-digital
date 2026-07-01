const db = require("../database/config");

const Report = {

    async getPosyanduReport() {

        const [rows] = await db.query(`
            SELECT
                u.name AS parent_name,
                u.nik,
        
                c.name AS baby_name,
                c.birth_date,
                c.gender,
        
                gr.age_month,
                gr.weight,
                gr.height,
        
                ns.nutrition_status,
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
        
            ORDER BY c.name ASC
        `);

        return rows;
    },

    async getReportSummary() {

        const [[result]] = await db.query(`
            SELECT COUNT(*) AS total
            FROM children
        `);

        return result;
    }


};

module.exports = Report;