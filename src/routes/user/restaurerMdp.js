const { Contribuable, CentreFiscal } = require('../../database/sequelize')

module.exports = app => {
    app.put('/utilisateur/restaurer-mdp', async ( req, res ) => {

        const { mail, motdepasse, type } = req.body

        if( mail && motdepasse && type ){
            try {
                const utilisateur = type == 'contribuable'
                ? await Contribuable.findOne({ where: { mail }})
                : await CentreFiscal.findOne({ where: { mail }})

                if ( !utilisateur ){
                    res.status(403).json({
                        message: 'Nous n\'avons pas pu trouver votre compte. Veuillez verifier votre adresse mail!',
                        data: null
                    })
                }
                else{
                    await utilisateur.update({ motdepasse })
                    res.status(200).json({
                        message: 'Mot de passe restauré avec succès.',
                        data: utilisateur
                    })
                }
            }
            catch( error ){
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