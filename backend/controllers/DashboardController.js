const NutritionStatus =
    require("../models/NutritionStatus");

const DashboardController = {



    async growthTrend(req, res) {

        try {

            const trend =
                await NutritionStatus.getGrowthTrend();

            res.json({
                message:
                    "Trend berhasil diambil",
                data: trend
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    },
    
    async growthChart(req,res){

        try{
    
            const data =
                await NutritionStatus.getGrowthChart(
                    req.params.childId
                );
    
            res.json({
                success:true,
                data
            });
    
        }catch(error){
    
            res.status(500).json({
                message:error.message
            });
    
        }
    
    },

    async stats(req, res) {

        try {
    
            const month =
                Number(req.query.month);
    
            const year =
                Number(req.query.year);
    
            if (!month || !year) {
    
                return res.status(400).json({
                    message:
                        "month dan year wajib"
                });
    
            }
    
            const stats =
                await NutritionStatus.getDashboardStatsByMonth(
                    month,
                    year
                );
    
            res.json({
                message:
                    "Statistik dashboard berhasil diambil",
                data: stats
            });
    
        } catch (error) {
    
            res.status(500).json({
                message:
                    error.message
            });
    
        }
    
    }
    

};

module.exports =
    DashboardController;