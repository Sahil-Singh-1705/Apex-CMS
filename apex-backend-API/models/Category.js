const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const category = sequelize.define(
    "categories",
    {
      category_name: DataTypes.STRING(100),
    },
    {
      timestamps: true,
    }
  );
  
  return category;
};
