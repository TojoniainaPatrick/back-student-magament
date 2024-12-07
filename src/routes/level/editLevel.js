const { Level } = require("../../database/sequelize")

module.exports = app => {
    app.put('/level/edit/:levelId', async( req, res ) => {
        await Level.findByPk( req.params.levelId )
        .then( async level => {
            if( !level ){
                res.status(400).json({
                    message: "Impossible de trouver le niveau demandé.",
                    data: null
                })
            }
            else{
                await level.update( req.body )
                .then( updatedLevel => {
                    res.status(200).json({
                        message: 'Modification effectuée avec succès',
                        data: updatedLevel
                    })
                })
            }
        })
        .catch( error => {
            res.status(500).json({
                message: error.message,
                data: error
            })
        })
    })
}