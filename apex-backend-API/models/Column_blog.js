const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Column_blog = sequelize.define(
    "Column_blog",
    {
      unique_id: DataTypes.STRING,
      BlogId: DataTypes.INTEGER,
      rowId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      width: DataTypes.STRING,
      colIndex: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );

  return Column_blog;
};
