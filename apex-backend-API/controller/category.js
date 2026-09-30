const { category,blog } = require("../db/db.js");
const Blog_category = category;
const blogs = blog;
// const { sequelize } = require('../db/db.js'); // Assuming sequelize instance is exported from your models file
// const { Op } = require('sequelize');
exports.getAllcategoriescounts = async (req, res) => {
  try {
    // Fetch all blogs
    const blog = await blogs.findAll();

    // Create an object to store category counts
    const categoryCounts = {};

    // Iterate over each blog
    for (const blo of blog) {
      // Split the category_id string by the delimiter (assuming it's comma)
      const categories = blo.category_id.split(',');

      // Iterate over each category in the blog
      for (const category of categories) {
        // Trim whitespace from category
        const trimmedCategory = category.trim();

        // Increment the count for the current category
        categoryCounts[trimmedCategory] = (categoryCounts[trimmedCategory] || 0) + 1;
      }
    }

      console.log({categoryCounts})
    // Send the category counts as response
    res.send({categoryCounts });
    
  } catch (error) {
    console.error('Error fetching blogs or counting categories:', error);
    // Send an error response
    res.status(500).json({ error: 'Internal server error' });
  }
}  
exports.addcategory = async (req, res) => {
  console.log(req.body);
  success=false;
  try {
    const {category_name} = req.body;
    console.log(category_name);
    if (!category_name) {
      return res.status(401).json({ msg: "Please provide a Category Name" });
    }
    let category = await Blog_category.findOne({
      where: {
        category_name: category_name,
      },
    });
    if (category) {
      return res.status(401).json({ message: "Category already exists",success:false });
    }

    await Blog_category.create({
      category_name: category_name,
    });
    
    success=true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Category added successfully!",
    });
  }
    catch (err) {
      console.log(err);
      return res.status(500).send({
        status: 500,
        success,
        message: "Internal Server Error.",
      });
    }
  
 
};
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
exports.getAllcategories = async (req, res) => {
  try {
    const categories = await Blog_category.findAll();
    res.send(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

//–––––––––––––––––––––––––––-–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
exports.updatecategory = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    const updateData = req.body;

    const updatedcategory = await Blog_category.findByPk(id);
    if (!updatedcategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    await updatedcategory.update(updateData);
    res.sendStatus(200);
  }catch{
    console.log(err);
    res.status(500).send();
  }

    
};
//–––––––––––––––---------––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
exports.deletecategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedcategory = await Blog_category.destroy({where:{id}});
    if (!deletedcategory) {
      return res.sendStatus(403);
    }
    return res.status(200).send({
      status: 200,
      success:true,
      message: "Category successfully deleted.",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send("There was a problem deleting the information from the database.");
  }
};
//––––––––––––––––––––––––––––––––––––––––––––––––––––——––––––––––––––––––––––––––––––--–––---–––––---–––-
