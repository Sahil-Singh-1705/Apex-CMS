const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TradeAndEarn = sequelize.define("TradeAndEarn", {
    firstname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    country_code: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    source: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return TradeAndEarn;
};
