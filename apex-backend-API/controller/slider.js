const { slider } = require("../db/db");
const crypto = require("crypto");
const Slider = slider;

///////////////add Slider/////////
exports.addSlider = async (req, res) => {
  let success = false;
  try {
    const { title, htmlCode, published } = req.body;
    let slider = await Slider.findOne({
      where: {
        title,
      },
    });

    if (slider) {
      return res.status(400).send({
        status: 400,
        success,
        message: "Title already exists.",
      });
    }

    slider = await Slider.create({
      title,
      htmlCode,
      published,
    });
    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Slider successfully added.",
    });
  } catch (err) {
    return res.status(500).send({
      err,
      status: 500,
      success,
      message: "Internal Server Error.",
    });
  }
};
//////////////update Slider/////////////////
exports.updateSlider = async (req, res) => {
  let success = false;
  try {
    const { title, htmlCode, published } = req.body;
    const { id } = req.params;
    const slider = await Slider.findOne({
      where: {
        id,
      },
    });
    if (!slider) {
      return res.status(404).send({
        status: 404,
        success,
        message: "Slider not found.",
      });
    }
    await Slider.update(
      {
        title,
        htmlCode,
        published,
      },
      { where: { id } }
    );
    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Slider successfully updated.",
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      success,
      message: "Internal Server Error.",
    });
  }
};
//////////////delete Slider/////////////////
exports.deleteSlider = async (req, res) => {
  let success = false;
  try {
    const { id } = req.params;
    const slider = await Slider.findOne({
      where: {
        id,
      },
    });
    if (!slider) {
      return res.status(404).send({
        status: 404,
        success,
        message: "Slider not found.",
      });
    }

    await slider.destroy({
      where: {
        id,
      },
    });
    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Slider successfully deleted.",
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      success,
      message: "Internal Server Error.",
    });
  }
};

//////////////get single Slider/////////////////
exports.getSingleSlider = async (req, res) => {
  let success = false;
  try {
    const { id } = req.params;
    const slider = await Slider.findOne({
      where: {
        id: id,
      },
    });
    if (!slider) {
      return res.status(404).send({
        status: 404,
        success,
        message: "Slider not found.",
      });
    } else {
      success = true;
      return res.status(200).send({
        status: 200,
        success,
        message: "Slider successfully retrieved.",
        slider,
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: 500,
      success,
      message: "Internal Server Error.",
    });
  }
};
////////getall slider/////////////////
exports.getAllSlider = async (req, res) => {
  let success = false;
  try {
    const slider = await Slider.findAll();
    if (!slider) {
      return res.status(404).send({
        status: 404,
        success,
        message: "Slider not found.",
      });
    }
    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Slider successfully retrieved.",
      slider,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      success,
      message: "Internal Server Error.",
    });
  }
};

///////////////////////////
exports.getallpublishedSlider = async (req, res) => {
  let success = false;
  try {
    const slider = await Slider.findAll({
      where: {
        published: 1,
      },
    });
    if (!slider) {
      return res.status(404).send({
        status: 404,
        success,
        message: "Slider not found.",
      });
    }
    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Slider successfully retrieved.",
      slider,
      });
    }
    catch (err) {
      return res.status(500).send({
        status: 500,
        success,
        message: "Internal Server Error.",
      });
    }
  }