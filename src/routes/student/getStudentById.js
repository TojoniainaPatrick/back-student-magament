const { Student } = require('../../database/sequelize')

module.exports = app => {
    app.get('/student/id/:studentId', async ( req, res ) => {
        await Student.findByPk( req.params.studentId )
        .then( student => {
            if( !student ){
                res.status(400).json({
                    message: "Impossible de trouver l'étudiant demandé.",
                    data: null
                })
            }
            else{
                res.status(200).json({
                    message: `Etudiant numero ${ req.params.studentId}`,
                    data: student
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