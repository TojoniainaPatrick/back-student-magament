const { Subject } = require('../../database/sequelize')

module.exports = app => {
    app.delete('/subject/delete/:subjectId', async ( req, res ) => {
        await Subject.findByPk( req.params.subjectId )
        .then( async subject => {
            if( !subject ){
                res.status(400).json({
                    message: "Impossible de trouver la matière demandée.",
                    data: null
                })
            }
            else{
                await subject.destroy()
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