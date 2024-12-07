const { ScheduleItem } = require("../../database/sequelize")

module.exports = app => {
    app.post('/schedule/add', async ( req, res ) => {
        await ScheduleItem.create( req.body )
        .then( newScheduleItem => {
            res.status(201).json({
                message: 'Horaire ajouté avec succès.',
                data: newScheduleItem
            })
        })
        .catch( error => {
            res.status(500).json({
                message: error.message,
                data: error
            })
        })
    })
}