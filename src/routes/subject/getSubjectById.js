const { Subject } = require('../../database/sequelize')

module.exports = app => {
    app.get('/subject/id/:subjectId', async ( req, res ) => {
        await Subject.findByPk( req.params.subjectId )
        .then( subject => {
            if( !subject ){
                res.status(400).json({
                    message: "Impossible de trouver la matière demandée.",
                    data: null
                })
            }
            else{
                res.status(200).json({
                    message: `Matière numero ${ req.params.subjectId}`,
                    data: subject
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