const ChildModel =
    require("../models/Child");

const GrowthRecord =
    require("../models/GrowthRecord");

const WhoStandard =
    require("../models/WhoStandard");

const NutritionStatus =
    require("../models/NutritionStatus");

function calculateZScore(
    value,
    l,
    m,
    s
) {

    if (l === 0) {
        return Math.log(value / m) / s;
    }

    return (
        Math.pow(value / m, l) - 1
    ) / (l * s);

}

const ChildController = {

    async index(req, res) {

        try {

            const children =
                await ChildModel.getAll();

            res.json({
                data: children
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

    async show(req, res) {

        try {

            const child =
                await ChildModel.getById(
                    req.params.id
                );

            if (!child) {

                return res.status(404).json({
                    message:
                        "Data balita tidak ditemukan"
                });

            }

            if (
                req.user.role === "parent" &&
                child.user_id !== req.user.id
            ) {

                return res.status(403).json({
                    message: "Akses ditolak"
                });

            }

            res.json({
                data: child
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
            user_id,
            name,
            gender,
            birth_date,
            weight,
            height
        } = req.body;

        // Simpan data balita
        const child =
            await ChildModel.create({

                user_id,
                name,
                gender,
                birth_date

            });

        // Jika BB dan TB diisi
        if (weight && height) {

            const birthDate =
                new Date(birth_date);

            const today =
                new Date();

            let ageMonth =
                (
                    today.getFullYear() -
                    birthDate.getFullYear()
                ) * 12;

            ageMonth +=
                today.getMonth() -
                birthDate.getMonth();

            const currentPeriod =
                `${today.getFullYear()}-${String(
                    today.getMonth() + 1
                ).padStart(2, "0")}`;

            const growth =
                await GrowthRecord.create({

                    child_id:
                        child.insertId,

                    age_month:
                        ageMonth,

                    period_month:
                        currentPeriod,

                    weight,

                    height

                });

            const weightStandard =
                await WhoStandard.getByAgeGenderAndType(

                    ageMonth,
                    gender,
                    "BB"

                );

            const heightStandard =
                await WhoStandard.getByAgeGenderAndType(

                    ageMonth,
                    gender,
                    "TB"

                );

            console.log("BB:", weightStandard);
            console.log("TB:", heightStandard);

            if (
                weightStandard &&
                heightStandard
            ) {

                const weightZScore =
                    calculateZScore(

                        Number(weight),

                        Number(
                            weightStandard.l
                        ),

                        Number(
                            weightStandard.m
                        ),

                        Number(
                            weightStandard.s
                        )

                    );

                const heightZScore =
                    calculateZScore(

                        Number(height),

                        Number(
                            heightStandard.l
                        ),

                        Number(
                            heightStandard.m
                        ),

                        Number(
                            heightStandard.s
                        )

                    );

                    const w = Number(weight);

                    let nutritionStatus = "";
                    
                    if (w < Number(weightStandard.sd3neg)) {
                    
                        nutritionStatus = "gizi_buruk";
                    
                    } else if (w < Number(weightStandard.sd2neg)) {
                    
                        nutritionStatus = "gizi_kurang";
                    
                    } else if (w <= Number(weightStandard.sd2)) {
                    
                        nutritionStatus = "normal";
                    
                    } else {
                    
                        nutritionStatus = "gizi_lebih";
                    
                    }

                const h = Number(height);

let stuntingStatus = "";

if (h < Number(heightStandard.sd3neg)) {

    stuntingStatus = "severe_stunting";

} else if (h < Number(heightStandard.sd2neg)) {

    stuntingStatus = "stunting";

} else if (h <= Number(heightStandard.sd2)) {

    stuntingStatus = "normal";

} else {

    stuntingStatus = "tinggi_berlebih";

}

                await NutritionStatus.create({

                    growth_id:
                        growth.insertId,

                    weight_zscore:
                        weightZScore,

                    nutrition_status:
                        nutritionStatus,

                    height_zscore:
                        heightZScore,

                    stunting_status:
                        stuntingStatus

                });

            }

        }

        return res.status(201).json({

            message:
                "Data balita berhasil ditambahkan",

            data: {

                id:
                    child.insertId,

                name,

                user_id,

                gender,

                birth_date

            }

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            message:
                error.message

        });

    }

},

    async update(req, res) {

        try {

            const child =
                await ChildModel.getById(
                    req.params.id
                );

            if (!child) {

                return res.status(404).json({
                    message:
                        "Data balita tidak ditemukan"
                });

            }

            if (
                req.user.role === "parent" &&
                child.user_id !== req.user.id
            ) {

                return res.status(403).json({
                    message:
                        "Akses ditolak"
                });

            }

            await ChildModel.update(
                req.params.id,
                req.body
            );

            res.json({
                message:
                    "Data balita berhasil diupdate"
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

    async destroy(req, res) {

        try {

            const child =
                await ChildModel.getById(
                    req.params.id
                );

            if (!child) {

                return res.status(404).json({
                    message:
                        "Data balita tidak ditemukan"
                });

            }

            if (
                req.user.role === "parent" &&
                child.user_id !== req.user.id
            ) {

                return res.status(403).json({
                    message:
                        "Akses ditolak"
                });

            }

            await ChildModel.delete(
                req.params.id
            );

            res.json({
                message:
                    "Data balita berhasil dihapus"
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

    async myChildren(req, res) {

        try {

            const children =
                await ChildModel.getByParent(
                    req.user.id
                );

            res.json({
                data: children
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }

};

module.exports = ChildController;