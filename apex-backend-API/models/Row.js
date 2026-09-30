const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Row = sequelize.define(
    "Row",
    {
      uniqueId: DataTypes.STRING,
      pageId: DataTypes.INTEGER,
      columnType: DataTypes.STRING,
      margin: DataTypes.STRING,
      padding: DataTypes.STRING,
      rowIndex: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );

  return Row;
};
