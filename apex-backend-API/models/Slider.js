const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Slider = sequelize.define(
    "Slider",
    {
      title: DataTypes.STRING,
      htmlCode: DataTypes.TEXT("long"),
      published: DataTypes.INTEGER,
    },
    {
      timestamps: true,
    }
  );

  return Slider;
};
