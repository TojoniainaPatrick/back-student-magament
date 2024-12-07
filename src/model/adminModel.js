const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      adminId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      adminName: DataTypes.STRING,
      adminEmail: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        defaultValue: 'admin'
      },
      adminPassword: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('adminPassword', bcrypt.hashSync( value, 10 ))
        }
      }
    });

  return Admin;
};
  