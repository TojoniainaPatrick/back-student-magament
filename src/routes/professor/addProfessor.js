const { Professor } = require("../../database/sequelize")

module.exports = app => {
    app.post('/professor/add', async ( req, res ) => {
        await Professor.create( req.body )
        .then( newProfessor => {
            res.status(201).json({
                message: 'Enseignant ajouté avec succès.',
                data: newProfessor
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