const { Student, Level } = require("../../database/sequelize")

module.exports = app => {
    app.get('/student/list', async ( req, res ) => {
        await Student.findAll({ include: [ Level ]})
        .then( students => {
            res.status(200).json({
                message: 'Liste des étudiants',
                data: students
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