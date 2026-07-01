const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');

const AuthController = {

    async register(req, res) {

        try {

            const {
                name,
                email,
                phone,
                nik,
                password,
                role
            } = req.body;

            const checkUser = await UserModel.findByPhone(phone);

            if (checkUser) {

                return res.status(400).json({
                    message: 'Nomor telepon sudah digunakan'
                });

            }

            if (role === 'parent') {
                if (!nik) {

                    return res.status(400).json({
                        message: 'NIK wajib diisi'
                    });

                }

                if (!/^\d{16}$/.test(nik)) {

                    return res.status(400).json({
                        message: 'NIK harus 16 digit angka'
                    });

                }

            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await UserModel.create({
                name,
                email,
                phone,
                nik,
                password: hashedPassword,
                role
            });

            res.status(201).json({
                message: 'Register berhasil'
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

    async login(req, res) {

        try {

            const { phone, password } = req.body;

            const user = await UserModel.findByPhone(phone);

            if (!user) {

                return res.status(401).json({
                    message: 'Nomor telepon salah'
                });

            }

            const isMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isMatch) {

                return res.status(401).json({
                    message: 'Password salah'
                });

            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            res.status(200).json({
                message: 'Login berhasil',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    nik: user.nik,
                    role: user.role
                }
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

    async profile(req, res) {

        try {

            const user = await UserModel.getById(req.user.id);

            if (!user) {

                return res.status(404).json({
                    message: 'User tidak ditemukan'
                });

            }

            res.status(200).json({
                user
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

    async logout(req, res) {

        try {

            res.status(200).json({
                message: 'Logout berhasil'
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }

};

module.exports = AuthController;