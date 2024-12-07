const { PaymentInstallment,  } = require("../../database/sequelize")

module.exports = app => {
    app.get('/payment/list', async ( req, res ) => {
        await PaymentInstallment.findAll({ include: [  ]})
        .then( payments => {
            res.status(200).json({
                message: 'Liste des paiements',
                data: payments
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