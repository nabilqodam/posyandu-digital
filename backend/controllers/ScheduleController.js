const Schedule =
    require('../models/Schedule');

const ActivityLog =
    require('../models/ActivityLog');

const ScheduleController = {

    async index(req, res) {

        try {
            await Schedule.deleteExpired();

            const schedules =
                await Schedule.getAll();

            res.json({
                data: schedules
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

    async show(req, res) {

        try {

            const schedule =
                await Schedule.getById(
                    req.params.id
                );

            if (!schedule) {

                return res.status(404).json({
                    message:
                        'Jadwal tidak ditemukan'
                });

            }

            res.json({
                data: schedule
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

    async store(req, res) {

        try {

            const {
                title,
                schedule_date,
                start_time,
                end_time,
                activity
            } = req.body;

            const result =
                await Schedule.create({

                    title,
                    schedule_date,
                    start_time,
                    end_time,
                    activity,

                    created_by:
                        req.user.id

                });

            await ActivityLog.create({

                user_id:
                    req.user.id,

                activity:
                    `Menambahkan jadwal ${title}`

            });

            res.status(201).json({

                message:
                    'Jadwal berhasil ditambahkan',

                data: {

                    id:
                        result.insertId,

                    title,
                    schedule_date,
                    start_time,
                    end_time,
                    activity

                }

            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

    async update(req, res) {

        try {

            const schedule =
                await Schedule.getById(
                    req.params.id
                );

            if (!schedule) {

                return res.status(404).json({
                    message:
                        'Jadwal tidak ditemukan'
                });

            }

            await Schedule.update(
                req.params.id,
                req.body
            );

            await ActivityLog.create({

                user_id:
                    req.user.id,

                activity:
                    `Mengubah jadwal ${schedule.title}`

            });

            res.json({
                message:
                    'Jadwal berhasil diupdate'
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

    async destroy(req, res) {

        try {

            const schedule =
                await Schedule.getById(
                    req.params.id
                );

            if (!schedule) {

                return res.status(404).json({
                    message:
                        'Jadwal tidak ditemukan'
                });

            }

            await Schedule.delete(
                req.params.id
            );

            await ActivityLog.create({

                user_id:
                    req.user.id,

                activity:
                    `Menghapus jadwal ${schedule.title}`

            });

            res.json({
                message:
                    'Jadwal berhasil dihapus'
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }

};

module.exports = ScheduleController;