const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Column = sequelize.define(
    "Column",
    {
      uniqueId: DataTypes.STRING,
      pageId: DataTypes.INTEGER,
      rowId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      width: DataTypes.STRING,
      colIndex: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );

  return Column;
};
