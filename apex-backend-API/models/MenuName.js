const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MenuName = sequelize.define(
    "Menuname",
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );

  return MenuName;
};
