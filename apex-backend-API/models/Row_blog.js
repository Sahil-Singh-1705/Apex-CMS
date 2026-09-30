const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Row_blog = sequelize.define(
      "Row_blog",
      {
        unique_id: DataTypes.STRING,
        BlogId: DataTypes.INTEGER,
        columnType: DataTypes.STRING,
        margin: DataTypes.STRING,
        padding: DataTypes.STRING,
        rowIndex: DataTypes.STRING,
      },
      {
        timestamps: true,
      }
    );
  
    return Row_blog;
  };
  