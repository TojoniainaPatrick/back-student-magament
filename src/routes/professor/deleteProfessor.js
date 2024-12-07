const { Professor } = require('../../database/sequelize')

module.exports = app => {
    app.delete('/professor/delete/:professorId', async ( req, res ) => {
        await Professor.findByPk( req.params.professorId )
        .then( async professor => {
            if( !professor ){
                res.status(400).json({
                    message: "Impossible de trouver l'enseignant.",
                    data: null
                })
            }
            else{
                await professor.destroy()
                .then( _ => {
                    res.status(200).json({
                        message: 'Suppression effectuée avec succès',
                        data: null
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