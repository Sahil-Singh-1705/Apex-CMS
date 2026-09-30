const { popup } = require("../db/db");
const crypto = require("crypto");
const Popup = popup;

///////////////add Popup/////////
exports.addPopup = async (req, res) => {
  let success = false;
  try {
    const { title, htmlCode, published , choosenpage,choosensize} = req.body;
    let popup = await Popup.findOne({
      where: {
        title,
      },
    });

    if (popup) {
      return res.status(400).send({
        status: 400,
        success,
        message: "Title already exists.",
      });
    }

    popup = await Popup.create({
      title,
      htmlCode,
      choosenpage,
      choosensize,
      published,
    });
    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Popup successfully added.",
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
//////////////update popup/////////////////
exports.updatePopup = async (req, res) => {
  let success = false;
  try {
    const { title, htmlCode, published , choosenpage,choosensize} = req.body;
    const { id } = req.params;
    const popup = await Popup.findOne({
      where: {
        id,
      },
    });
    if (!popup) {
      return res.status(404).send({
        status: 404,
        success,
        message: "Popup not found.",
      });
    }
    await Popup.update(
      {
        title,
        htmlCode,
        published,
        choosensize,

        choosenpage,

      },
      { where: { id } }
    );
    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Popup successfully updated.",
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      success,
      message: "Internal Server Error.",
    });
  }
};
//////////////delete popup/////////////////
exports.deletePopup = async (req, res) => {
  let success = false;
  try {
    const { id } = req.params;
    const popup = await Popup.findOne({
      where: {
        id,
      },
    });
    if (!popup) {
      return res.status(404).send({
        status: 404,
        success,
        message: "Popup not found.",
      });
    }

    await Popup.destroy({
      where: {
        id,
      },
    });
    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Popup successfully deleted.",
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      success,
      message: "Internal Server Error.",
    });
  }
};

//////////////get single popup/////////////////
exports.getSinglePopup = async (req, res) => {
  let success = false;
  try {
    const { id } = req.params;
    const popup = await Popup.findOne({
      where: {
        id: id,
      },
    });
    if (!popup) {
      return res.status(404).send({
        status: 404,
        success,
        message: "Popup not found.",
      });
    } else {
      success = true;
      return res.status(200).send({
        status: 200,
        success,
        message: "Popup successfully retrieved.",
        popup,
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
////////getall popup/////////////////
exports.getAllPopup = async (req, res) => {
  let success = false;
  try {
    const popup = await Popup.findAll();
    if (!popup) {
      return res.status(404).send({
        status: 404,
        success,
        message: "Popup not found.",
      });
    }
    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Popup successfully retrieved.",
      popup,
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
exports.getallpublishedPopup = async (req, res) => {
  let success = false;
  try {
    const popup = await Popup.findAll({
      where: {
        published: 1,
      },
    });
    if (!popup) {
      return res.status(404).send({
        status: 404,
        success,
        message: "Popup not found.",
      });
    }
    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Popup successfully retrieved.",
      popup,
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