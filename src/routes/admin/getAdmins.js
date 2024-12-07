const { Admin } = require("../../database/sequelize")

module.exports = app => {
    app.get('/admin/list', async ( req, res ) => {
        await Admin.findAll()
        .then( admins => {
            res.status(200).json({
                message: 'Liste des admins',
                data: admins
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