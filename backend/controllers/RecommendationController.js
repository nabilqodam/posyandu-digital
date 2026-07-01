const Recommendation =
require("../models/Recommendation");

const Interpretation =
require("../models/Interpretation");

const NutritionStatus =
require("../models/NutritionStatus");

const RecommendationController = {


async index(req, res) {

    try {

        const data =
            await Recommendation.getAll();

        res.json({
            data
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

},

async byChild(req, res) {

    try {

        const childId =
            req.params.childId;

        const nutrition =
            await NutritionStatus
                .getLatestByChild(
                    childId
                );

        if (!nutrition) {

            return res.status(404).json({
                message:
                    "Data status gizi tidak ditemukan"
            });

        }

        const interpretation =
            await Interpretation.getByStatus(
                nutrition.nutrition_status
            );

        const recommendations =
            await Recommendation.getByStatus(
                nutrition.nutrition_status
            );

        res.json({

            child: {

                child_id:
                    nutrition.child_id,

                child_name:
                    nutrition.child_name,

                age_month:
                    nutrition.age_month,

                weight:
                    nutrition.weight,

                height:
                    nutrition.height

            },

            nutrition: {

                weight_zscore:
                    nutrition.weight_zscore,

                nutrition_status:
                    nutrition.nutrition_status,

                height_zscore:
                    nutrition.height_zscore,

                stunting_status:
                    nutrition.stunting_status

            },

            interpretation:
                interpretation || {

                    title:
                        "Belum tersedia interpretasi",

                    description:
                        "Interpretasi untuk status ini belum tersedia.",

                    detail:
                        ""

                },

            recommendations

        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

},

async latest(req, res) {

    try {

        const childId =
            req.params.childId;

        const nutrition =
            await NutritionStatus
                .getLatestByChild(childId);

        res.json({
            data: nutrition
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}


};

module.exports =
RecommendationController;
