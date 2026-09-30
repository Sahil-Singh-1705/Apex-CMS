const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Menu = sequelize.define(
    "Menu",
    {
      name: DataTypes.STRING,
      link: DataTypes.STRING,
      pageId: DataTypes.INTEGER,
      type: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      menuNameId: DataTypes.INTEGER,
    },
    {
      timestamps: true,
    }
  );

  return Menu;
};
