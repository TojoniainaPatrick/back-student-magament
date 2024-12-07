const { Professor } = require('../../database/sequelize')

module.exports = app => {
    app.get('/professor/id/:professorId', async ( req, res ) => {
        await Professor.findByPk( req.params.professorId )
        .then( professor => {
            if( !professor ){
                res.status(400).json({
                    message: "Impossible de trouver l'enseignant demandé.",
                    data: null
                })
            }
            else{
                res.status(200).json({
                    message: `Enseignant numero ${ req.params.professorId}`,
                    data: professor
                })
            }
        })
        .catch( error => {
            res.status(500).json({
                message: error.message,
                data: error
            })
        })
    })
}