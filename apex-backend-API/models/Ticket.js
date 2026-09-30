const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Ticket = sequelize.define(
    "Ticket",
    {
        email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        subject: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Open",
        }
    },
    {
      timestamps: true,
    }
  );

  return Ticket;
};