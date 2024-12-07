const { Level } = require('../../database/sequelize')

module.exports = app => {
    app.delete('/level/delete/:levelId', async ( req, res ) => {
        await Level.findByPk( req.params.levelId )
        .then( async level => {
            if( !level ){
                res.status(400).json({
                    message: "Impossible de trouver le niveau.",
                    data: null
                })
            }
            else{
                await level.destroy()
                .then( _ => {
                    res.status(200).json({
                        message: 'Suppression effectuée avec succès',
                        data: null
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