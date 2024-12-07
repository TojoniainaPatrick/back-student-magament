const { Student } = require('../../database/sequelize')

module.exports = app => {
    app.delete('/student/delete/:studentId', async ( req, res ) => {
        await Student.findByPk( req.params.studentId )
        .then( async student => {
            if( !student ){
                res.status(400).json({
                    message: "Impossible de trouver l'étudiant.",
                    data: null
                })
            }
            else{
                await student.destroy()
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