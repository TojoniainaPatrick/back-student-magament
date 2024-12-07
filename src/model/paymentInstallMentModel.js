module.exports = (sequelize, DataTypes) => {
    const PaymentInstallment = sequelize.define(
        'PaymentInstallment',
        {
            paymentInstallMentId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            paymentInstallMentAmount: DataTypes.REAL
        },
        {
            timeStamps: true,
            createdAt: 'paymentInstallmentDate'
        }
    )

    return PaymentInstallment;
};
  