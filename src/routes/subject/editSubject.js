const { Subject } = require("../../database/sequelize")

module.exports = app => {
    app.put('/subject/edit/:subjectId', async( req, res ) => {
        await Subject.findByPk( req.params.subjectId )
        .then( async subject => {
            if( !subject ){
                res.status(400).json({
                    message: "Impossible de trouver la matière demandée.",
                    data: null
                })
            }
            else{
                await subject.update( req.body )
                .then( updatedSubject => {
                    res.status(200).json({
                        message: 'Modification effectuée avec succès',
                        data: updatedSubject
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