const { Professor } = require("../../database/sequelize")

module.exports = app => {
    app.get('/professor/list', async ( req, res ) => {
        await Professor.findAll()
        .then( students => {
            res.status(200).json({
                message: 'Liste des enseignants',
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