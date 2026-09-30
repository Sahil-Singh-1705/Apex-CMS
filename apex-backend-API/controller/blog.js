const { blog, row_blog, column_blog } = require("../db/db.js");
const blogs = blog;
const Row_blog = row_blog;
const Column_blog = column_blog;
const crypto = require("crypto");
const { Op } = require('sequelize');
// -----------–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––-
exports.addblog = async (req, res) => {
  let success = false;

  try {
    const row = req.body.rows;
    const rows = JSON.parse(row);
    // console.log("pradip",rows[0].cols);
  
    
    let page = await blogs.findOne({
      where: {
        subtitle: req.body.subtitle,
      },
    });

    // console.log(page)
    // console.log(!page)

    if (!page) {

      let blog = await blogs.create({
      
        title: req.body.title,
        subtitle: req.body.subtitle,
        keyword: req.body.keyword,


        author: req.body.author,
        description: req.body.description,
        category_id: req.body.category_id,
        slug: req.body.slug,
        excerpt: req.body.excerpt,
        customclass: req.body.customclass,
        htmlCode: req.body.htmlCode,
        published: req.body.published,
        thumbnail_image: req.files["thumbnail_image"][0].filename, 
        banner_image: req.files["banner_image"][0].filename,
      });


      // console.log(blog);
      // console.log(page);
      for (let i = 0; i < rows.length; i++) {
        let row = await Row_blog.create({
          unique_id: rows[i].id,
          BlogId: blog.id,
          columnType: rows[i].columnType,
          margin: rows[i].margin,
          padding: rows[i].padding,
          rowIndex: i,
        });
        for (let j = 0; j < rows[i].cols.length; j++) {
          // console.log("divya",rows[i].cols[j].id)
          await Column_blog.create({
            unique_id: rows[i].cols[j].id,
            BlogId: blog.id,
            rowId: row.id,
            content: rows[i].cols[j].content,
            width: rows[i].cols[j].width,
            colIndex: j,
          });
        }
      }
      success = true;
      res.status(201).json({ success, blog });
    } else {
      res.status(400).json({ message: "blog alredy exists" });
    }
  } catch (error) {
    console.log(error);
    // The new user has been created
    // Handle any errors, e.g., validation errors or database issues
    res.status(400).json({ error: error });
  }
};
//   --------------------------------------––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
exports.showallblogs = async (req, res) => {
  try {
    const data = await blogs.findAll({order: [['createdAt', 'DESC']]});
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//=------------------------------------------------------------––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

exports.showallrelatedblogs = async (req, res) => {
  const { category } = req.query;
  
  try {
    const categories = category.split(",");
    let bl = [];
    const uniqueBlogIds = new Set(); // Set to store unique blog IDs

    for (const category of categories) {
      const categoryBlogs = await blogs.findAll({
        where: {
          category_id: {
            [Op.like]: `%${category}%` // Use Sequelize's like operator for partial matching
          }
        },
        order: [['createdAt', 'DESC']]
      });

      // Filter out duplicate blogs
      const filteredCategoryBlogs = categoryBlogs.filter(blog => !uniqueBlogIds.has(blog.id));

      // Add filtered blogs to the result and update the unique blog IDs set
      filteredCategoryBlogs.forEach(blog => {
        bl.push(blog);
        uniqueBlogIds.add(blog.id);
      });
    }

    const limitedBlogs = bl.slice(0, 6);

    res.send(limitedBlogs);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//=------------------------------------------------------------––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
exports.showallblogs_admin = async (req, res) => {
  try {
    const data = await blogs.findAll({order: [['createdAt', 'DESC']]});
    res.setHeader('Cache-Control', 'no-store');
    res.json(data);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// --------------------------------------------––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
exports.getOneBlogadmin = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await blogs.findByPk(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    const rows = await Row_blog.findAll({
      where: {
        BlogId: id,
      },
      order: [["rowIndex", "ASC"]],
      raw: true,
    });

    let data = [];
    for (let i = 0; i < rows.length; i++) {
      let cols = await Column_blog.findAll({
        where: {
          rowId: rows[i].id,
          BlogId: id,
        },
        order: [["colIndex", "ASC"]],
        raw: true,
      });
      let allCols = [];
      for (let j = 0; j < cols.length; j++) {
        allCols.push({
          BlogId: cols[j].BlogId,
          colId: cols[j].unique_id,
          width: cols[j].width,
          content: cols[j].content,
        });
        // console.log("rqahul",cols)
      }
    
      data.push({
        id: rows[i].uniqueId,
        BlogId: rows[i].BlogId,
        margin: rows[i].margin,
        padding: rows[i].padding,
        columnType: rows[i].columnType,
        cols: allCols,
      });
    }

      // console.log(data)
    return res.status(200).send({
     
      data: {
        blog,
        rows: data,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//------------------------––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
exports.getOneBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await blogs.findOne({where:{slug:id}});
    // console.log("babab",blog)
      
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    const rows = await Row_blog.findAll({
      where: {
        BlogId: blog.id,
      },
      order: [["rowIndex", "ASC"]],
      raw: true,
    });

    let data = [];
    for (let i = 0; i < rows.length; i++) {
      let cols = await Column_blog.findAll({
        where: {
          rowId: rows[i].id,
          BlogId: blog.id,
        },
        order: [["colIndex", "ASC"]],
        raw: true,
      });
      let allCols = [];
      for (let j = 0; j < cols.length; j++) {
        allCols.push({
          
          colId: cols[j].uniqueId,
          BlogId: cols[j].BlogId,
          width: cols[j].width,
          content: cols[j].content,
        });
      }
     
    
      data.push({
        id: rows[i].uniqueId,
        BlogId: rows[i].BlogId,
        margin: rows[i].margin,
        padding: rows[i].padding,
        columnType: rows[i].columnType,
        cols: allCols,
      });
    }

      // console.log(data)
    return res.status(200).send({
     
      data: {
        blog,
        rows: data,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//-––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
exports.updateblog = async (req, res) => {
  try {

    const id = req.params.id;
    const blog = await blogs.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    const row = req.body.rows;
    const rows = JSON.parse(row);
    // console.log(req.files);
    console.log("bansii",rows[0].cols);
    
   
    await blog.update({
      title: req.body.title,
      subtitle: req.body.subtitle,
      keyword: req.body.keyword,
      author: req.body.author,
      description: req.body.description,
      category_id: req.body.category_id,
      slug: req.body.slug,
      excerpt: req.body.excerpt,
      customclass: req.body.customclass,
      htmlCode: req.body.htmlCode,
      published: req.body.published,
      thumbnail_image: req.files["thumbnail_image"]?.length > 0 ? req.files["thumbnail_image"][0].filename : blog.thumbnail_image ,
      banner_image: req.files["banner_image"]?.length > 0 ? req.files["banner_image"][0].filename : blog.banner_image ,


      
});
     
    
    await Row_blog.destroy({
      where: {
        BlogId: id,
      },
    });
    await Column_blog.destroy({
      where: {
        BlogId: id,
      },
    });
    for (let i = 0; i < rows.length; i++) {
       let row = await Row_blog.create({
          unique_id: rows[i].id,
          BlogId: blog.id,
          columnType: rows[i].columnType,
          margin: rows[i].margin,
          padding: rows[i].padding,
          rowIndex: i,
        });
        
      for (let j = 0; j < rows[i].cols.length; j++) {
        console.log( "update_col",rows[i].cols[j].id)
        await Column_blog.create({

          BlogId: id,
          unique_id: rows[i].cols[j].colId ? rows[i].cols[j].colId : rows[i].cols[j].id,
          rowId: row.id,
          content: rows[i].cols[j].content,
          width: rows[i].cols[j].width,
          colIndex: j,
        });
      }
    }
    success = true;
   
    return res.status(200).send({
      status: 200,
      success,
      message: "Blog successfully edited.",
    });
  } catch (err) {
    console.log(err);
        
    return res.status(500).send({
      status: 500,
       
      message: "Internal Server Error.",
    }
    )}
    };


//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
exports.deleteblog = async (req, res) => {
  try {
    const id = req.params.id;
    await Row_blog.destroy({
      where: {
        BlogId: id,
      },
    });
    await Column_blog.destroy({
      where: {
        BlogId: id,
      },
    });
    const blog = await blogs.destroy({ where: { id: id } });
    if (!blog) {
      return res.sendStatus(403);
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send("There was a problem deleting the information from the database.");
  }
};
