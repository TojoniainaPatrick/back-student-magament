const { SchoolFees, Student, PaymentInstallment, Level, Month, AcademicYear } = require("../../database/sequelize")

module.exports = app => {
    app.get('/school-fees/id/:schoolFeesId', async ( req, res ) => {
        await SchoolFees.findByPk( req.params.schoolFeesId, { include: [
            {
                model: Student,
                include: [ Level ]
            },
            {
                model: Month,
                include: AcademicYear
            },
            PaymentInstallment
        ]})
        .then( schoolFees => {
            res.status(200).json({
                message: `Ecolage Ref: ${ req.params.schoolFeesId }`,
                data: schoolFees
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