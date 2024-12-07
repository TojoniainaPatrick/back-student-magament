const { months, levels } = require("../../constant/periode")
const { AcademicYear, Month, Level } = require("../../database/sequelize")

module.exports = app => {
    app.post('/year/add', async ( req, res ) => {

        await AcademicYear.update(
            { currentYear: false },
            { where: { currentYear: true }}
        )
        await AcademicYear.create( req.body )
        .then( newAcademicYear => {

            months.map( async month => {
                await Month.create({
                    monthName: month,
                    academicYearId: newAcademicYear.academicYearId
                })
            })

            levels.map( async level => {
                await Level.create({
                    levelDesignation: level.levelDesignation,
                    monthlySchoolFees: level.monthlySchoolFees,
                    academicYearId: newAcademicYear.academicYearId
                })
            })

            res.status(201).json({
                message: 'Etudiant ajouté avec succès.',
                data: newAcademicYear
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