const { Contribuable, CentreFiscal } = require("../../database/sequelize")
const bcrypt = require('bcryptjs')

module.exports = app => {
    app.put('/utilisateur/changer-mdp', async ( req, res ) => {

        const { mail, ancien_mdp, nouveau_mdp, type } = req.body

        if( mail && ancien_mdp && nouveau_mdp && type )
        {
            try {
                const utilisateur = type == 'contribuable'
                ? await Contribuable.findOne({ where: { mail }})
                : await CentreFiscal.findOne({ where: { mail }})

                if ( !utilisateur ){
                    res.status(403).json({ message: 'Nous n\'avons pas pu trouver votre compte. Veuillez verifier votre adresse mail!' })
                }
                else{
                    if( bcrypt.compareSync(ancien_mdp, utilisateur.motdepasse) ){
                        await utilisateur.update({ motdepasse : nouveau_mdp })
                            .then( _=>{
                                res.status(200).json({
                                    message: 'Opération effectuée avec succès!',
                                    data: utilisateur
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