const { menus, submenus, menunames } = require("../db/db");
const Menus = menus;
const SubMenus = submenus;
const MenuNames = menunames;

exports.getAllMenusName = async (req, res) => {
  let success = false;
  try {
    let menuNames = await MenuNames.findAll({});

    success = true;
    return res.status(200).send({
      status: 200,
      success,
      data: menuNames,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      success,
      message: "Internal Server Error.",
    });
  }
};

exports.getAllMenus = async (req, res) => {
  let success = false;
  try {
    const { id } = req.params;

    let menuName = await MenuNames.findOne({
      where: {
        id:id
      },
    });

    if (!menuName) {
      return res.status(404).send({
        status: 404,
        success,
        message: "Menu name not found",
      });
    }

    let allMenus = await Menus.findAll({
      where: {
        menuNameId: id,
      },
      raw: true,
    });

    let finalMenu = [];

    for (let i = 0; i < allMenus.length; i++) {
      let subMenu = await SubMenus.findAll({
        where: {
          menuId: allMenus[i].id,
          menuNameId: id,
        },
        raw: true,
      });
      finalMenu.push({
        ...allMenus[i],
        subMenus: subMenu,
      });
    }

    success = true;
    return res.status(200).send({
      status: 200,
      success,
      menuName: menuName?.name,
      data: finalMenu,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      success,
      message: "Internal Server Error.",
    });
  }
};

exports.addMenuName = async (req, res) => {
  let success = false;
  try {
    const { name } = req.body;

    await MenuNames.create({
      name,
    });

    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Added Menu name",
    });
  } catch (err) {
    return res.status(500).send({
      status: 200,
      success,
      message: "Internal Server Error.",
    });
  }
};

exports.addMenus = async (req, res) => {
  let success = false;
  try {
    const { name, menus } = req.body;

    let menuName = await MenuNames.create({ name });

    if (!menuName) {
      return res.status(400).json({
        status: 400,
        success,
        message: "Failed to add menu name",
      });
    }
    for (let i = 0; i < menus.length; i++) {
      let newmenu = await Menus.create({
        name: menus[i].name,
        type: menus[i].type,
        link: menus[i].link,
        menuNameId: menuName.id,
      });
      for (let j = 0; j < menus[i].subMenus.length; j++) {
        await SubMenus.create({
          menuId: newmenu.id,
          name: menus[i].subMenus[j].name,
          link: menus[i].subMenus[j].link,
          type: menus[i].subMenus[j].type,
          menuNameId: menuName.id,
        });
      }
    }

    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Menu and submenu created successfully",
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

exports.editMenus = async (req, res) => {
  let success = false;

  try {
    const { id } = req.params;
    const { name, menus } = req.body;

    await MenuNames.update({ name }, { where: { id } });

    await Menus.destroy({
      where: {
        menuNameId: id,
      },
    });
    await SubMenus.destroy({
      where: {
        menuNameId: id,
      },
    });
    for (let i = 0; i < menus.length; i++) {
      let newmenu = await Menus.create({
        name: menus[i].name,
        type: menus[i].type,
        link: menus[i].link,
        menuNameId: id,
      });
      for (let j = 0; j < menus[i].subMenus.length; j++) {
        await SubMenus.create({
          menuId: newmenu.id,
          name: menus[i].subMenus[j].name,
          link: menus[i].subMenus[j].link,
          type: menus[i].subMenus[j].type,
          menuNameId: id,
        });
      }
    }

    success = true;
    return res.status(200).send({
      status: 200,
      success,
      message: "Menu and submenu updated successfully",
    });
  } catch (err) {
    return res.status(500).send({
      status: 200,
      success,
      message: "Internal Server Error.",
    });
  }
};
