const { Professor } = require("../../database/sequelize")

module.exports = app => {
    app.put('/professor/edit/:studentId', async( req, res ) => {
        await Professor.findByPk( req.params.studentId )
        .then( async professor => {
            if( !professor ){
                res.status(400).json({
                    message: "Impossible de trouver l'enseignant demandé.",
                    data: null
                })
            }
            else{
                await professor.update( req.body )
                .then( upsatedProfessor => {
                    res.status(200).json({
                        message: 'Modification effectuée avec succès',
                        data: upsatedProfessor
                    })
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