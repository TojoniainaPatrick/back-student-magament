module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define('Subject', {
      subjectId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      subjectName: DataTypes.STRING
    });
  
    return Subject;
  };
  