module.exports = (sequelize, DataTypes) => {
    const SchoolFees = sequelize.define(
        'SchoolFees',
        {
            schoolFeesId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            schoolFeesAmount: DataTypes.REAL,
            schoolFeesRemainder: DataTypes.REAL,
            schoolFeesStatus: {
                type: DataTypes.STRING,
                defaultValue: "Impayé"
            }
        })

    return SchoolFees;
};
  