const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Page = sequelize.define(
    "Page",
    {
      uniqueId: DataTypes.STRING,
      name: DataTypes.STRING,
      keyword:DataTypes.TEXT,
      endpoint: DataTypes.STRING,
      htmlCode: DataTypes.TEXT("long"),
      description: DataTypes.TEXT,
      published: DataTypes.INTEGER,
      header_type:DataTypes.STRING
    },
    {
      timestamps: true,
    }
  );

  return Page;
};
