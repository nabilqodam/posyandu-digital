const db = require('../database/config');

const UserModel = {

    async getById(id) {

        const [rows] = await db.query(`
            SELECT
                id,
                nik,
                name,
                email,
                phone,
                password,
                role
            FROM users
            ORDER BY id DESC
        `);
    
        return rows;

    },

    async findByName(name) {
        const [rows] = await db.query(`
            SELECT *
            FROM users
            WHERE name = ?
        `, [name]);

        return rows[0];
    },

    async findByPhone(phone) {

        const [rows] = await db.query(`
            SELECT *
            FROM users
            WHERE phone = ?
        `, [phone]);

        return rows[0];
    },

    async create(data) {

        const {
            name,
            email,
            phone,
            nik,
            password,
            role
        } = data;

        const [result] = await db.query(`
            INSERT INTO users
            (
                name,
                email,
                phone,
                nik,
                password,
                role
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `, [
            name,
            email,
            phone,
            nik,
            password,
            role
        ]);

        return result;
    },

    async getAll() {
        const [rows] = await db.query(
            'SELECT id, name, email, role FROM users'
        );

        return rows;
    },

    async getParents() {

        const [rows] = await db.query(`
            SELECT
                id,
                name
            FROM users
            WHERE role = 'parent'
            ORDER BY name ASC
        `);

        return rows;
    },
    async getAllUsers() {

        const [rows] = await db.query(`
            SELECT
                id,
                nik,
                name,
                email,
                phone,
                role
            FROM users
            ORDER BY id DESC
        `);
    
        return rows;
    
    },
    
    async update(id, data) {

        const {
            name,
            email,
            phone,
            password,
            role
        } = data;
    
        const [result] = await db.query(`
            UPDATE users
            SET
                name = ?,
                email = ?,
                phone = ?,
                password = ?,
                role = ?
            WHERE id = ?
        `, [
            name,
            email,
            phone,
            password,
            role,
            id
        ]);
    
        return result;
    },
    
    async delete(id) {
    
        const [result] = await db.query(`
            DELETE FROM users
            WHERE id = ?
        `, [id]);
    
        return result;
    
    },

};

module.exports = UserModel;