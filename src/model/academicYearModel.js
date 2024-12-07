module.exports = (sequelize, DataTypes) => {
    const AcademicYear = sequelize.define(
        'AcademicYear',
        {
            academicYearId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            year1: DataTypes.STRING,
            year2: DataTypes.STRING,
            currentYear: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        })

    return AcademicYear;
};
  