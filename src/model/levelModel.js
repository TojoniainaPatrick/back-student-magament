module.exports = (sequelize, DataTypes) => {
    const Level = sequelize.define(
        'Level',
        {
            levelId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            levelDesignation: DataTypes.STRING,
            monthlySchoolFees: DataTypes.REAL
        })

    return Level;
};