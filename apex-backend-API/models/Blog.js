const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Blog = sequelize.define(
    "Blog",
    {
      
      title: DataTypes.STRING, 
      subtitle: DataTypes.STRING,
      keyword: DataTypes.TEXT,
      author: DataTypes.STRING,
      description: DataTypes.TEXT,
      category_id: DataTypes.TEXT,
      slug: DataTypes.STRING,
      excerpt: DataTypes.TEXT("long"),
      customclass: DataTypes.TEXT,
      htmlCode: DataTypes.TEXT("long"),
      published: DataTypes.TEXT,
      thumbnail_image: DataTypes.STRING,
      banner_image: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );
  return Blog;
};
