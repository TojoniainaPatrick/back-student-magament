const { Level } = require("../../database/sequelize")

module.exports = app => {
    app.post('/level/add', async ( req, res ) => {
        await Level.create( req.body )
        .then( newLevel => {
            res.status(201).json({
                message: 'Niveau ajouté avec succès.',
                data: newLevel
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