module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define(
    'Professor',
    {
      professorId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      professorName: DataTypes.STRING,
      professorEmail: DataTypes.STRING,
      professorAddress: DataTypes.STRING,
    });

  return Professor;
};
  