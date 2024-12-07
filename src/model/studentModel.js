const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      studentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      studentInscriptionNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      studentName: DataTypes.STRING,
      studentEmail: DataTypes.STRING,
      studentAddress: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        defaultValue: 'student'
      },
      studentPassword: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('studentPassword', bcrypt.hashSync( value, 10 ))
        }
      }
    });

  return Student;
};
  