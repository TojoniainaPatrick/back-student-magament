const { Admin } = require("../../database/sequelize")
const bcrypt = require('bcryptjs')

module.exports = app => {
    app.put('/admin/edit-password', async ( req, res ) => {

        const { mail, currentPassword, newPassword } = req.body

        if( mail && currentPassword && newPassword )
        {
            try {
                const admin = await Admin.findOne({ where: { adminEmail: mail }})

                if ( !admin ){
                    res.status(403).json({ message: 'Nous n\'avons pas pu trouver votre compte. Veuillez verifier votre adresse mail!' })
                }
                else{
                    if( bcrypt.compareSync(currentPassword, admin.adminPassword) ){
                        await admin.update({ adminPassword : newPassword })
                            .then( _=>{
                                res.status(200).json({
                                    message: 'Opération effectuée avec succès!',
                                    data: admin
                                })
                            })
                            .catch( error => {
                                res.status(500).json({
                                    message: 'Nous n\'avons pas pu changer le mot de passe. Veuillez ressayer dans quelques instants!',
                                    data: error
                                })
                            })
                    }
                    else{
                        res.status(403).json({ message: 'Mot de passe actuel incorrect'})
                    }
                }
            } catch (error) {
                res.status(500).json({ 
                    message: error.message,
                    data: error
                })
            }
        }
        else{
            res.status(400).json({ message: 'Merci de bien vouloir compléter tous les champs.' })
        }
    })
}