const { admin,images } = require("../db/db");
// const { hash, genSalt, compare } = require("bcrypt");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");
const Admin = admin;
const Images=images;
exports.createAdmin = async (req, res) => {
  let success = false;

  try {
    const { email, name, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);

    await Admin.create({
      email,
      password: securePassword,
      name,
    });

    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Admin created.",
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      success,
      message: "Internal Server Error.",
    });
    
  }
};

exports.adminLogin = async (req, res) => {
  let success = false;

  try {
    const { name, password } = req.body;

    // Input validation
    if (!name || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    let admin = await Admin.findOne({
      where: { name },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    const checkPassword = await bcrypt.compare(password, admin.password);
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }
    
    const data = {
      admin: {
        id: admin.id,
        name: admin.name,
      },
    };
    
    const token = jwt.sign(data, jwtSecret, { expiresIn: '7d' });
    
    success = true;
   
    return res.json({
      success: true,
      token: token,
      message: "Login successful"
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

exports.changepassword = async (req, res) => {
  try {
    const { old_pass, new_pass, confirm_pass } = req.body;
    
    
    const user = await Admin.findOne({ where:{id:req.admin.id} });

    const isPasswordMatch = await bcrypt.compare(old_pass, user.password);
    
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Old password is incorrect' });
    }
    
    if (new_pass !== confirm_pass) {
      return res.status(400).json({ error: 'New password and confirm password do not match' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_pass,salt);
    
    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();
    
    res.status(200).json({ success: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.upload_image= async(req, res) => {
  try {
  
    if (req.file) {
     
  await Images.create( { image: req.file.filename })

        
      // Image uploaded successfully
      res.status(200).json({ message: 'Image uploaded successfully', });
    
    } else {
      // Handle the case where the image upload failed
      res.status(400).json({ error: 'Image upload failed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.upload_image = async (req, res) => {
  try {
    if (req.file) {
      
      console.log(req.file.filename);
      const imageUrl = `https://api.everafx.com/static/images/${req.file.filename}`;

      // Save the image information to your database (assuming you have a model named Images)
      await Images.create({ image: req.file.filename });

      // Send the URL of the uploaded image in the response
      res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
    } else {
      // Handle the case where the image upload failed
      res.status(400).json({ error: 'Image upload failed' });
    }
  } catch (error) {
    console.error('Error:', error); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateAdmin = () => {
  
}