const { Sequelize, DataTypes, where } = require('sequelize')
const academicYearModel = require('../model/academicYearModel')
const adminModel = require('../model/adminModel')
const levelModel = require('../model/levelModel')
const monthModel = require('../model/monthModel')
const paymentInstallMentModel = require('../model/paymentInstallMentModel')
const professorModel = require('../model/professorModel')
const studentModel = require('../model/studentModel')
const scheduleItemModel = require('../model/scheduleItemModel')
const schoolFeesModel = require('../model/schoolFeesModel')
const subjectModel = require('../model/subjectModel')

// creating database connection object
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER_NAME,
    process.env.DATABASE_USER_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        define: { freezeTableName: true },
        logging: false,
    }
)

const AcademicYear = academicYearModel( sequelize, DataTypes )
const Admin = adminModel( sequelize, DataTypes )
const Level = levelModel( sequelize, DataTypes )
const Month = monthModel( sequelize, DataTypes )
const PaymentInstallment = paymentInstallMentModel( sequelize, DataTypes )
const Professor = professorModel( sequelize, DataTypes )
const ScheduleItem = scheduleItemModel( sequelize, DataTypes )
const SchoolFees = schoolFeesModel( sequelize, DataTypes )
const Student = studentModel( sequelize, DataTypes )
const Subject = subjectModel( sequelize, DataTypes )


AcademicYear.hasMany( Month, { foreignKey: 'academicYearId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
AcademicYear.hasMany( Level, { foreignKey: 'academicYearId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )

Level.belongsTo( AcademicYear, { foreignKey: 'academicYearId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
Level.hasMany( Student, { foreignKey: 'levelId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
Level.hasMany( Subject, { foreignKey: 'levelId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
Level.hasMany( ScheduleItem, { foreignKey: 'levelId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )

Month.belongsTo( AcademicYear, { foreignKey: 'academicYearId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
Month.hasMany( SchoolFees, { foreignKey: 'monthId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )

PaymentInstallment.belongsTo( SchoolFees, { foreignKey: 'schoolFeesId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )

Professor.hasMany( Subject, { foreignKey: 'professorId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
Professor.hasMany( ScheduleItem, { foreignKey: 'professorId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )

ScheduleItem.belongsTo( Subject, { foreignKey: 'subjectId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
ScheduleItem.belongsTo( Level, { foreignKey: 'levelId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )

SchoolFees.hasMany( PaymentInstallment, { foreignKey: 'schoolFeesId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
SchoolFees.belongsTo( Student, { foreignKey: 'studentId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
SchoolFees.belongsTo( Month, { foreignKey: 'monthId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )

Student.hasMany( SchoolFees, { foreignKey: 'studentId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
Student.belongsTo( Level, { foreignKey: 'levelId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )

Subject.hasMany( ScheduleItem, { foreignKey: 'subjectId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
Subject.belongsTo( Professor, { foreignKey: 'professorId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
Subject.belongsTo( Level, { foreignKey: 'levelId', onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
  

const runApp = async ( app ) => {
    await sequelize.sync()
    // await sequelize.sync({ alter: true })
    // await sequelize.sync({ force: true })
    .then( async _=> {

        await Admin.findOrCreate({
            where: { adminEmail: 'admin@gmail.com'},
            defaults: {
                adminEmail: 'admin@gmail.com',
                adminName: 'admin',
                type: 'admin',
                adminPassword: 'admin'
            }
        });

        app.listen( process.env.PORT, _=> console.log(`App is running on ${ process.env.HOST }:${ process.env.PORT } `) )
    })
    .catch( error => console.log( error ))
}

module.exports = {
    runApp,
    AcademicYear,
    Admin,
    Level,
    Month,
    PaymentInstallment,
    Professor,
    ScheduleItem,
    SchoolFees,
    Student,
    Subject,
}

  