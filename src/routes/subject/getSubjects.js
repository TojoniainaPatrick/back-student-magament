const { Subject, Level, Professor } = require("../../database/sequelize")

module.exports = app => {
    app.get('/subject/list', async ( req, res ) => {
        await Subject.findAll({ include: [ Level, Professor ]})
        .then( subjects => {
            res.status(200).json({
                message: 'Liste des matières',
                data: subjects
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