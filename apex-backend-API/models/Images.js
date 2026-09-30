const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Images = sequelize.define(
    "Images",
    {
      image:DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );

  return Images;
};
