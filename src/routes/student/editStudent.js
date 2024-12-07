const { Student } = require("../../database/sequelize")

module.exports = app => {
    app.put('/student/edit/:studentId', async( req, res ) => {
        await Student.findByPk( req.params.studentId )
        .then( async student => {
            if( !student ){
                res.status(400).json({
                    message: "Impossible de trouver l'étudiant demandé.",
                    data: null
                })
            }
            else{
                await student.update( req.body )
                .then( updatedStudent => {
                    res.status(200).json({
                        message: 'Modification effectuée avec succès',
                        data: updatedStudent
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