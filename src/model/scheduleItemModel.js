const { timeTable, day } = require("../constant/periode");

module.exports = (sequelize, DataTypes) => {
    const ScheduleItem = sequelize.define(
        'ScheduleItem',
        {
            scheduleItemId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            scheduleItemHour: {
                type: DataTypes.STRING,
                get() {
                    return timeTable[ this.getDataValue('scheduleItemHour')]
                }
            },
            scheduleItemDay: {
                type: DataTypes.STRING,
                get() {
                    return day[ this.getDataValue('scheduleItemDay')]
                }
            }
        })

    return ScheduleItem;
};
  