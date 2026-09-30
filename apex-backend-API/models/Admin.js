const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Admin = sequelize.define(
    "Admin",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );

  return Admin;
};
