const express = require("express");
const router = express.Router();

const db = require("../db/db");
const logger = require("../utils/logger");

const FooterSettings = db.FooterSettings;

router.get("/footer", async (req, res) => {
  try {
    const data = await FooterSettings.findOne({ where: { id: 1 } });

    if (!data) {
      logger.error("Footer Fetch Error: Data not found", {
        url: req.originalUrl,
      });

      return res.status(404).json({
        success: false,
        message: "Footer data not found",
      });
    }

    return res.json({
      success: true,
      data: data,
    });

  } catch (error) {
    logger.error("Footer Fetch Error", {
      message: error.message,
      stack: error.stack,
      url: req.originalUrl,
    });

    return res.status(500).json({
      success: false,
      message: "Error fetching footer data",
    });
  }
});


router.put("/footer/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      logger.error("Footer Update Error: Missing ID", {
        body: req.body,
      });

      return res.status(400).json({
        success: false,
        message: "Footer ID is required",
      });
    }

    const footer = await FooterSettings.findByPk(id);

    if (!footer) {
      logger.error("Footer Update Error: Record not found", {
        id,
      });

      return res.status(404).json({
        success: false,
        message: "Footer record not found",
      });
    }

    await footer.update(req.body);

    return res.json({
      success: true,
      message: "Footer updated successfully",
      data: footer,
    });

  } catch (error) {
    logger.error("Footer Update Error", {
      message: error.message,
      stack: error.stack,
      body: req.body,
      params: req.params,
    });

    return res.status(500).json({
      success: false,
      message: "Footer update failed",
    });
  }
});

router.use((req, res) => {
  logger.error("Invalid Footer Route", {
    method: req.method,
    url: req.originalUrl,
  });

  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = router;