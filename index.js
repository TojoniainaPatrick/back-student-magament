require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { runApp } = require('./src/database/sequelize')
const app = express()

app
    .use(cors())
    .use(express.json({ extended: true }))

// admin routes
require('./src/routes/admin/changeAdminPass')(app)
require('./src/routes/admin/editAdmin')(app)

// student routes
require('./src/routes/student/addStudent')(app)
require('./src/routes/student/changeStudentPass')(app)
require('./src/routes/student/deleteStudent')(app)
require('./src/routes/student/editStudent')(app)
require('./src/routes/student/getStudentById')(app)
require('./src/routes/student/getStudents')(app)

// professor routes
require('./src/routes/professor/addProfessor')(app)
require('./src/routes/professor/deleteProfessor')(app)
require('./src/routes/professor/editProfessor')(app)
require('./src/routes/professor/getProfessorById')(app)
require('./src/routes/professor/getProfessors')(app)

// subject routes
require('./src/routes/subject/addSubject')(app)
require('./src/routes/subject/deleteSubject')(app)
require('./src/routes/subject/editSubject')(app)
require('./src/routes/subject/getSubjectById')(app)
require('./src/routes/subject/getSubjects')(app)

// level routes
require('./src/routes/level/addLevel')(app)
require('./src/routes/level/deleteLevel')(app)
require('./src/routes/level/editLevel')(app)
require('./src/routes/level/getLevels')(app)

// shool fees routes
require('./src/routes/school-fees/getSchoolFees')(app)
require('./src/routes/school-fees/getSchoolFeesById')(app)

// year routes
require('./src/routes/academic-year/createYear')(app)
require('./src/routes/academic-year/getCurrentYear')(app)
require('./src/routes/academic-year/getYears')(app)

// schedule routes
require('./src/routes/schedule-item/addScheduleItem')(app)
require('./src/routes/schedule-item/deleteScheduleItem')(app)
require('./src/routes/schedule-item/getSchedules')(app)

// paiement routes
require('./src/routes/payment-installment/addPayment')(app)
require('./src/routes/payment-installment/getPayments')(app)

// user routes
require('./src/routes/admin/getAdmins')(app)
require('./src/routes/user/authentification')(app)


app.use( ({res}) => res.status(404).json({ message: 'Impossible de trouver la ressource demandée. Veuillez vérifier votre lien!' }) )

runApp(app)