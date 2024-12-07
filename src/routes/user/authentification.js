const { where } = require("sequelize")
const { Student, Admin } = require("../../database/sequelize")
const bcrypt = require('bcryptjs')

module.exports = app => {

    app.post('/authentication', async( req, res ) => {
        
        const { mail, password } = req.body

        if( mail && password ){

            const student = await Student.findOne({ where: { studentEmail: mail }})
            const admin = await Admin.findOne({ where: { adminEmail: mail }})

            if ( admin ){
                if( bcrypt.compareSync( password, admin.adminPassword )){
                    res.status(200).json({
                        message: 'Authentification effectuée avec succès.',
                        data: admin
                    })
                }
                else{
                    res.status(403).json({
                        message: 'Mot de passe incorrect.',
                        data: null
                    })
                }
            }
            else if ( student ){
                if( bcrypt.compareSync( password, student.studentPassword )){
                    res.status(200).json({
                        message: 'Authentification effectuée avec succès.',
                        data: student
                    })
                }
                else{
                    res.status(403).json({
                        message: 'Mot de passe incorrect.',
                        data: null
                    })
                }
            }
            else {
                res.status(403).json({ message: 'Nous n\'avons pas pu trouver votre compte. Veuillez verifier votre adresse e-mail!' })
            }
        }
        else{
            res.status(400).json({
                message: 'Merci de bien vouloir compléter tous les champs!'
            })
        }
    })
}