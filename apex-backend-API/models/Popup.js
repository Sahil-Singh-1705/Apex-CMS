const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Popup = sequelize.define(
    "Popup",
    {
      title: DataTypes.STRING,
      htmlCode: DataTypes.TEXT("long"),
      choosenpage: DataTypes.STRING,
      choosensize: DataTypes.STRING,
      published: DataTypes.INTEGER,
    },
    {
      timestamps: true,
    }
  );

  return Popup;
};
