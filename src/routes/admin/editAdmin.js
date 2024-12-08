const { Admin } = require("../../database/sequelize")

module.exports = app => {
    app.put('/admin/edit/:adminId', async( req, res ) => {
        await Admin.findByPk( req.params.adminId )
        .then( async admin => {
            if( !admin ){
                res.status(400).json({
                    message: "Impossible de trouver le compte demandé.",
                    data: null
                })
            }
            else{
                await admin.update( req.body )
                .then( updatedAdmin => {
                    res.status(200).json({
                        message: 'Modification effectuée avec succès',
                        data: updatedAdmin
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