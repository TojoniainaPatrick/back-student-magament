const { ScheduleItem, Level, Subject, Professor } = require("../../database/sequelize")

module.exports = app => {
    app.get('/schedule/list', async ( req, res ) => {
        await ScheduleItem.findAll({ include: [
            {
                model: Subject,
                include: [ Professor, Level ]
            }
        ]})
        .then( schedules => {
            res.status(200).json({
                message: 'Liste des horaires',
                data: schedules
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