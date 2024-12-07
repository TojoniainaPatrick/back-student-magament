const { Level, AcademicYear } = require("../../database/sequelize")

module.exports = app => {
    app.get('/level/list', async ( req, res ) => {
        await Level.findAll({ include: [ AcademicYear ]})
        .then( levels => {
            res.status(200).json({
                message: 'Liste des niveaux',
                data: levels
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