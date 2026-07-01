const WhoStandard =
    require("../models/WhoStandard");

const WhoController = {

    async curve(req, res) {

        try {
    
            const gender =
                req.params.gender;
    
            const type =
                req.query.type;
    
            const rows =
                await WhoStandard.getAllByGender(
                    gender,
                    type
                );
    
            res.json({
                data: rows
            });
    
        } catch (error) {
    
            res.status(500).json({
                message: error.message
            });
    
        }
    
    },

    async reference(req, res) {

        try {

            const data =
                await WhoStandard.getReferenceTable();

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

module.exports =
    WhoController;