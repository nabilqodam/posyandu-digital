const Child =
    require('../models/Child');

const NutritionStatus =
    require('../models/NutritionStatus');

const NutritionController = {

    // ADMIN LIHAT SEMUA
    async index(req, res) {

        try {

            const data =
                await NutritionStatus.getAll();

            res.json({
                data
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

    // PARENT LIHAT DATA ANAKNYA
    async parentHistory(req, res) {

        try {

            const data =
                await NutritionStatus.getByUser(
                    req.user.id
                );

            res.json({
                data
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

    // DETAIL PER ANAK
    async history(req, res) {
        try {

            const childId =
                req.params.childId;

            const child =
                await Child.getById(
                    childId
                );

            if (!child) {

                return res.status(404).json({
                    message:
                        'Data balita tidak ditemukan'
                });

            }

            if (
                req.user.role === 'parent' &&
                child.user_id !== req.user.id
            ) {

                return res.status(403).json({
                    message:
                        'Akses ditolak'
                });

            }

            const data =
                await NutritionStatus.getByChild(
                    childId
                );

            res.json({
                data
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }

};

module.exports = NutritionController;