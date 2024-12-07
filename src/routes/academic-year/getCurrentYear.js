const { where } = require('sequelize')
const { AcademicYear, Month, Level } = require('../../database/sequelize')

module.exports = app => {
    app.get('/year/current', async ( req, res ) => {
        await AcademicYear.findOne({
            where: { currentYear: true },
            include: [ Month, Level ]
        })
        .then( currentYear => {
            if( !currentYear ){
                res.status(400).json({
                    message: "Il n'y pas encore d'année courante",
                    data: null
                })
            }
            else{
                res.status(200).json({
                    message: `Année courante`,
                    data: currentYear
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