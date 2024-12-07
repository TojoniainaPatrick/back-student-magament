const { where } = require("sequelize")
const { Student, AcademicYear, Month, SchoolFees, Level } = require("../../database/sequelize")

module.exports = app => {
    app.post('/student/add', async ( req, res ) => {
        await Student.create( req.body )
        .then( async newStudent => {

            const studentLevel = await Level.findByPk( req.body.levelId ) 

            await AcademicYear.findOne({
                where: { currentYear: true },
                include: [ Month ]
            })
            .then( async foundYear => {
                foundYear.Months?.map( async month => {
                    await SchoolFees.create({
                        schoolFeesAmount: studentLevel.monthlySchoolFees,
                        schoolFeesRemainder: studentLevel.monthlySchoolFees,
                        monthId: month.monthId,
                        studentId: newStudent.studentId
                    })
                })
            })

            res.status(201).json({
                message: 'Etudiant ajouté avec succès.',
                data: newStudent
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