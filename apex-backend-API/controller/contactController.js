const db = require("../db/db");
const logger = require("../utils/logger"); 

const Contact = db.Contact;

exports.createMessage = async (req, res) => {
  try {
    logger.info("Create Message API Hit", { body: req.body });

    const {
      name = "",
      email = "",
      phone = "",
      subject = "",
      message = "",
    } = req.body;

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      logger.warn("Validation Failed: Missing required fields", {
        name: cleanName,
        email: cleanEmail,
      });

      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      logger.warn("Validation Failed: Invalid email format", {
        email: cleanEmail,
      });

      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const data = await Contact.create({
      name: cleanName,
      email: cleanEmail,
      phone: phone.trim(),
      subject: subject.trim(),
      message: cleanMessage,
    });

    logger.info("Message Created Successfully", { id: data.id });

    return res.json({
      success: true,
      message: "Message submitted successfully",
      data,
    });

  } catch (error) {
    logger.error("CREATE MESSAGE ERROR", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    logger.info("Get All Messages API Hit");

    const messages = await Contact.findAll({
      order: [["created_at", "DESC"]],
    });

    logger.info("Messages Fetched", { count: messages.length });

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    logger.error("GET MESSAGES ERROR", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const id = req.params.id;
    logger.info("Get Single Message API Hit", { id });

    const message = await Contact.findByPk(id);

    if (!message) {
      logger.warn("Message Not Found", { id });

      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    logger.error("GET MESSAGE ERROR", {
      message: error.message,
      stack: error.stack,
      id: req.params.id,
    });

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.markRead = async (req, res) => {
  try {
    const id = req.params.id;
    logger.info("Mark Read API Hit", { id });

    await Contact.update(
      { status: "read" },
      { where: { id } }
    );

    logger.info("Message Marked as Read", { id });

    res.json({
      success: true,
      message: "Marked as read",
    });
  } catch (error) {
    logger.error("MARK READ ERROR", {
      message: error.message,
      stack: error.stack,
      id: req.params.id,
    });

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const id = req.params.id;
    logger.info("Delete Message API Hit", { id });

    await Contact.destroy({
      where: { id },
    });

    logger.info("Message Deleted", { id });

    res.json({
      success: true,
      message: "Message deleted",
    });
  } catch (error) {
    logger.error("DELETE MESSAGE ERROR", {
      message: error.message,
      stack: error.stack,
      id: req.params.id,
    });

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};