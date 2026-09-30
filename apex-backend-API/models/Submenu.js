const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SubMenu = sequelize.define(
    "Submenu",
    {
      menuId: DataTypes.INTEGER,
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

  return SubMenu;
};
