const { SchoolFees, Student, PaymentInstallment, Level, Month } = require("../../database/sequelize")

module.exports = app => {
    app.get('/school-fees/list', async ( req, res ) => {
        await SchoolFees.findAll({ include: [
            {
                model: Student,
                include: [ Level ]
            },
            PaymentInstallment,
            Month
        ]})
        .then( schoolFees => {
            res.status(200).json({
                message: 'Liste des écolage',
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