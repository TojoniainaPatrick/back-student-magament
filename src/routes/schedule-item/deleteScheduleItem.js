const { ScheduleItem } = require('../../database/sequelize')

module.exports = app => {
    app.delete('/scedule/delete/:scheduleItemId', async ( req, res ) => {
        await ScheduleItem.findByPk( req.params.scheduleItemId )
        .then( async schedultItem => {
            if( !schedultItem ){
                res.status(400).json({
                    message: "Impossible de trouver l'horaire.",
                    data: null
                })
            }
            else{
                await schedultItem.destroy()
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