const GrowthRecord =
    require('../models/GrowthRecord');

const Child =
    require('../models/Child');

const ActivityLog =
    require('../models/ActivityLog');

const WhoStandard =
    require('../models/WhoStandard');

const NutritionStatus = 
    require('../models/NutritionStatus');

const getInterpretation =
    require('../helpers/interpretation');

function calculateZScore(
    value,
    l,
    m,
    s
) {

    if (l === 0) {

        return Math.log(
            value / m
        ) / s;

    }

    return (
        Math.pow(
            value / m,
            l
        ) - 1
    ) / (
        l * s
    );

}

const GrowthController = {

    async store(req, res) {

        try {

            const {
                child_id,
                weight,
                height
            } = req.body;

            const child =
                await Child.getById(child_id);

            if (!child) {

                return res.status(404).json({
                    message:
                        'Data balita tidak ditemukan'
                });

            }

            const birthDate =
                new Date(child.birth_date);

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
                `${today.getFullYear()}-${
                    String(
                        today.getMonth() + 1
                    ).padStart(2, '0')
                }`;
            
            const existingGrowth =
                await GrowthRecord.getByChildAndPeriod(
                    child_id,
                    currentPeriod
                );

            if (existingGrowth) {

                return res.status(400).json({
                    message:
                        'Data pertumbuhan periode ini sudah ada'
                });

            }

            const growth =
                await GrowthRecord.create({

                    child_id,
                    age_month: ageMonth,
                    period_month:
                        currentPeriod,
                    weight,
                    height

                });

            const weightStandard =
    await WhoStandard.getByAgeGenderAndType(
        ageMonth,
        child.gender,
        'BB'
    );

const heightStandard =
    await WhoStandard.getByAgeGenderAndType(
        ageMonth,
        child.gender,
        'TB'
    );

let nutrition = null;

if (
    weightStandard &&
    heightStandard
) {

    const weightZScore =
        calculateZScore(

            Number(weight),

            Number(weightStandard.l),

            Number(weightStandard.m),

            Number(weightStandard.s)

        );

    const heightZScore =
        calculateZScore(

            Number(height),

            Number(heightStandard.l),

            Number(heightStandard.m),

            Number(heightStandard.s)

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

    nutrition = {

        weight_zscore:
            Number(
                weightZScore.toFixed(2)
            ),

        nutrition_status:
            nutritionStatus,

        height_zscore:
            Number(
                heightZScore.toFixed(2)
            ),

        stunting_status:
            stuntingStatus,

        interpretation:
            getInterpretation(
                nutritionStatus,
                weightZScore,
                heightZScore
            )

    };

}

            await ActivityLog.create({

                user_id:
                    req.user.id,

                activity:
                    `Menambahkan data pertumbuhan anak ${child.name}`

            });

            res.status(201).json({

                message:
                    'Data pertumbuhan berhasil ditambahkan',

                data: {

                    growth_id:
                        growth.insertId,

                    child_id,

                    child_name:
                        child.name,

                    age_month:
                        ageMonth,

                    weight,

                    height,

                    nutrition

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

        const {
            child_id,
            period_month,
            weight,
            height
        } = req.body;

        if (
            !child_id ||
            !period_month ||
            weight === undefined ||
            height === undefined
        ) {

            return res.status(400).json({
                message:
                    'Child, periode, berat badan dan tinggi badan wajib diisi'
            });

        }

        const child =
            await Child.getById(
                child_id
            );

        if (!child) {

            return res.status(404).json({
                message:
                    'Data balita tidak ditemukan'
            });

        }

        const birthDate =
            new Date(
                child.birth_date
            );

        const periodDate =
            new Date(
                `${period_month}-01`
            );

        let ageMonth =
            (
                periodDate.getFullYear() -
                birthDate.getFullYear()
            ) * 12;

        ageMonth +=
            periodDate.getMonth() -
            birthDate.getMonth();

        const existingGrowth =
            await GrowthRecord.getByChildAndPeriod(
                child_id,
                period_month
            );

        let growthId;

        if (existingGrowth) {

            growthId =
                existingGrowth.id;

            await GrowthRecord.update(
                growthId,
                {
                    weight,
                    height,
                    age_month:
                        ageMonth,
                    period_month
                }
            );

        } else {

            const result =
                await GrowthRecord.create({

                    child_id,

                    period_month,

                    age_month:
                        ageMonth,

                    weight,

                    height

                });

            growthId =
                result.insertId;

        }

        const weightStandard =
    await WhoStandard.getByAgeGenderAndType(
        ageMonth,
        child.gender,
        'BB'
    );

const heightStandard =
    await WhoStandard.getByAgeGenderAndType(
        ageMonth,
        child.gender,
        'TB'
    );

   

let nutrition = null;

if (
    weightStandard &&
    heightStandard
) {

    const weightZScore =
        calculateZScore(

            Number(weight),

            Number(weightStandard.l),

            Number(weightStandard.m),

            Number(weightStandard.s)

        );

    const heightZScore =
        calculateZScore(

            Number(height),

            Number(heightStandard.l),

            Number(heightStandard.m),

            Number(heightStandard.s)

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

    const nutritionRow =
        await NutritionStatus.getByGrowth(
            growthId
        );

    if (nutritionRow) {

        await NutritionStatus.updateByGrowthId(
            growthId,
            {

                weight_zscore:
                    weightZScore,

                nutrition_status:
                    nutritionStatus,

                height_zscore:
                    heightZScore,

                stunting_status:
                    stuntingStatus

            }
        );

    } else {

        await NutritionStatus.create({

            growth_id:
                growthId,

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

    nutrition = {

        weight_zscore:
            Number(
                weightZScore.toFixed(2)
            ),

        height_zscore:
            Number(
                heightZScore.toFixed(2)
            ),

        nutrition_status:
            nutritionStatus,

        stunting_status:
            stuntingStatus,

        interpretation:
            getInterpretation(
                nutritionStatus,
                weightZScore,
                heightZScore
            )

    };

}

        await ActivityLog.create({

            user_id:
                req.user.id,

            activity:
                `Memperbarui data pertumbuhan anak ${child.name} periode ${period_month}`

        });

        return res.status(200).json({

            message:
                'Data pertumbuhan berhasil disimpan',

            data: {

                growth_id:
                    growthId,

                child_id,

                child_name:
                    child.name,

                period_month,

                age_month:
                    ageMonth,

                weight,

                height,

                nutrition

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

    async index(req, res) {

        try {

            const history =
                await GrowthRecord.getAll();

            res.json({
                data: history
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

    async parentHistory(req, res) {

        try {

            const history =
                await GrowthRecord.getByUser(
                    req.user.id
                );

            res.json({
                data: history
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },

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

            // CEK OWNERSHIP
            if (
                req.user.role === 'parent' &&
                child.user_id !== req.user.id
            ) {

                return res.status(403).json({
                    message:
                        'Akses ditolak'
                });

            }

            const history =
                await GrowthRecord.getByChild(
                    childId
                );

            res.json({
                data: history
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }

};

module.exports = GrowthController;