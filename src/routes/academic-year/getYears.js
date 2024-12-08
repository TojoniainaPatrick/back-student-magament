const { AcademicYear, Month, Level } = require("../../database/sequelize")

module.exports = app => {
    app.get('/year/list', async ( req, res ) => {
        await AcademicYear.findAll({ include: [ Month, Level ]})
        .then( years => {
            res.status(200).json({
                message: 'Liste des années academiques',
                data: years
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