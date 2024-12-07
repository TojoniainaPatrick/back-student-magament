const { Subject } = require("../../database/sequelize")

module.exports = app => {
    app.post('/subject/add', async ( req, res ) => {
        await Subject.create( req.body )
        .then( newSubject => {
            res.status(201).json({
                message: 'Matière ajoutée avec succès.',
                data: newSubject
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