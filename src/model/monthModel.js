module.exports = (sequelize, DataTypes) => {
    const Month = sequelize.define(
        'Month',
        {
            monthId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            monthName: DataTypes.STRING,
        })

    return Month;
};
  