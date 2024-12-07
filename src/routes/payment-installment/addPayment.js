const { where } = require("sequelize")
const { PaymentInstallment, SchoolFees } = require("../../database/sequelize")

module.exports = app => {
    app.post('/payment/add', async ( req, res ) => {

        const schoolFees = await SchoolFees.findByPk( req.body.schoolFeesId )

        await PaymentInstallment.create( req.body )
        .then( async newPaiment => {

            await schoolFees.decrement( 'schoolFeesRemainder', { by: req.body.paymentInstallMentAmount })
            await SchoolFees.update( { schoolFeesStatus: 'Payé' }, { where: { schoolFeesRemainder: 0 }})

            res.status(201).json({
                message: 'Paiment enregistré avec succès.',
                data: newPaiment
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