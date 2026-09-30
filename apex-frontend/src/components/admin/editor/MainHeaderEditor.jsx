"use client";

import {
  Box,
  Button,
  IconButton,
  Collapse,
  Grid,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { v4 as uuid } from "uuid";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { ExpandLess, ExpandMore, LinkOffOutlined } from "@mui/icons-material";
import MainMenu from "./ui/MainMenu";
import SubMenuModal from "@/components/modals/SubMenuModal";
import { ModalContext } from "@/context/context";
import { AlertContext } from "@/context/context";
import { logError } from "@/utils/logger";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const MainHeader = ({ token, allPages }) => {
  const [menuData, setMenuData] = useState([]);
  const [pageSubMenu, setPageSubmenu] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [allMenuNames, setAllMenuNames] = useState([]);
  const [selectedMenuName, setSelectedMenuName] = useState("");
  const { setAlert } = useContext(AlertContext);
  // Custom
  const [customLinkMenu, setCustomLinkMenu] = useState(false);
  const [customLinkText, setCustomLinkText] = useState("");
  const [customLink, setCustomLink] = useState("");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const { onOpen } = useContext(ModalContext);

  const handleAllMenuNames = async () => {
    const allMenuNameRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/menunames/all`, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       
      },
      { cache: 'no-store' },
    );
    const allMenuNames = await allMenuNameRes.json();
 
    if (allMenuNames?.success) {
      setAllMenuNames(allMenuNames?.data);
    }
  };
   
  useEffect(() => {
    handleAllMenuNames();
  }, []);
  //  console.log("url",process.env.NEXT_PUBLIC_API_URL)
  const handleSelectMenuName = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/all/${selectedMenuName}`, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },{ cache: 'no-store' },
    );
    let data = await response.json();
  
    if (data?.success) {
      setMenuName(data?.menuName);
      setMenuData(data?.data);
    }
  };

  const handleAddMenu = (menu) => {
    setMenuData([...menuData, menu]);
    setCustomLink("");
    setCustomLinkText("");
  };

  const handleRemoveMenu = (id) => {
    setMenuData(menuData?.filter((el) => el?.id !== id));
  };

  const handleSubMenuRemove = (menuIndex, subMenuId) => {
    menuData[menuIndex].subMenus = menuData[menuIndex].subMenus?.filter(
      (el) => el?.id !== subMenuId
    );
    setMenuData([...menuData]);
  };

  const handleAddSubMenu = (subMenus, menuIndex) => {
    menuData[menuIndex].subMenus = subMenus;
    setMenuData(
      menuData?.map((el, index) =>
        index === menuIndex ? { ...el, subMenus } : el
      )
    );
  };

  const handleUpdateMenuData = (name, link, index) => {
    menuData[index].name = name;
    menuData[index].link = link;
    setMenuData([...menuData]);
  };

  const handleUpdateSubMenu = (name, link, index, subIndex) => {
    menuData[index].subMenus[subIndex].name = name;
    menuData[index].subMenus[subIndex].link = link;
    setMenuData([...menuData]);
  };

  const handleAddSubmit = async () => {
    let data = {
      name: menuName,
      menus: menuData,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/add`,  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },{ cache: 'no-store' });
    let res = await response.json();
    if (res.success) {
      setAlert({
        message: "Menu added successfully!",
        type: "success",
        open: true,
      });
     
    }
    // console.log(res);
  };

  const handleUpdateSubmit = async () => {
    let data = {
      name: menuName,
      menus: menuData,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/edit/${selectedMenuName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }, { cache: 'no-store' },
    );
    let res = await response.json();
    if (res.success) {
      setAlert({
        message: "Menu updated successfully!",
        type: "success",
        open: true,
      });
     
    }
 
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;

    const updatedMenus = [...menuData];

    [updatedMenus[index - 1], updatedMenus[index]] = [
      updatedMenus[index],
      updatedMenus[index - 1],
    ];

    setMenuData(updatedMenus);
  };

  const handleMoveDown = (index) => {
    if (index === menuData.length - 1) return;

    const updatedMenus = [...menuData];

    [updatedMenus[index + 1], updatedMenus[index]] = [
      updatedMenus[index],
      updatedMenus[index + 1],
    ];

    setMenuData(updatedMenus);
  };

  const handleSubMenuMoveUp = (menuIndex, subIndex) => {
    if (subIndex === 0) return;
  
    const updatedMenus = [...menuData];
  
    const subMenus = [...updatedMenus[menuIndex].subMenus];
  
    [subMenus[subIndex - 1], subMenus[subIndex]] = [
      subMenus[subIndex],
      subMenus[subIndex - 1],
    ];
  
    updatedMenus[menuIndex].subMenus = subMenus;
  
    setMenuData(updatedMenus);
  };
  
  const handleSubMenuMoveDown = (menuIndex, subIndex) => {
    const updatedMenus = [...menuData];
  
    const subMenus = [...updatedMenus[menuIndex].subMenus];
  
    if (subIndex === subMenus.length - 1) return;
  
    [subMenus[subIndex + 1], subMenus[subIndex]] = [
      subMenus[subIndex],
      subMenus[subIndex + 1],
    ];
  
    updatedMenus[menuIndex].subMenus = subMenus;
  
    setMenuData(updatedMenus);
  };

  return (
    <Box className="bg-white pt-10">
      <SubMenuModal
        handleSubMenu={(val, menuIndex) => handleAddSubMenu(val, menuIndex)}
      />
      <Typography variant="h4">All Menus</Typography>
      <Box
        paddingTop={"15px"}
        paddingBottom={"15px"}
        display="flex"
        justifyContent={"start"}
        alignItems={"end"}
      >
        <Box width={"40%"} marginRight={"10px"}>
          <InputLabel>Menu Name</InputLabel>
          <Select
            value={selectedMenuName}
            onChange={(e) => setSelectedMenuName(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            size="small"
            sx={{ width: "100%" }}
          >
            {allMenuNames?.map((el) => {
              return (
                <MenuItem key={el?.id} value={el?.id}>
                  {el?.name}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#F07539",
            fontWeight: "bold",
            border: "1px solid #F07539",
            ":hover": {
              backgroundColor: "#fff",
              color: "#F07539",
              border: "1px solid #F07539",
            },
            marginRight: "10px",
          }}
          onClick={() => handleSelectMenuName()}
        >
          Select
        </Button>
      </Box>
      <Grid container columnGap={2} marginTop="50px">
        <Grid item xs={3}>
          <Box
            sx={{
              padding: "5px",
            }}
          >
            <ListItemButton
              onClick={() => setPageSubmenu(!pageSubMenu)}
              sx={{
                backgroundColor: "#eeeeee",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
              }}
            >
              <ListItemText primary={"Page"} />
              {pageSubMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={pageSubMenu}
              sx={{
                border: "1px solid #cfcfcf",
              }}
            >
              <List
                sx={{
                  width: "100%",
                  maxHeight: "400px",
                  overflow: "hidden",
                  overflowY: "scroll",
                  bgcolor: "background.paper",
                }}
              >
                {allPages?.data?.map((el) => {
                  const labelId = `checkbox-list-label-${el?.id}`;
                  return (
                    <ListItem key={el?.uniqueId} disablePadding>
                      <ListItemButton role={undefined} onClick={() => {}} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            value={el}
                            checked={
                              menuData?.find((menu) => menu?.id === el?.id)
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              e.target.checked
                                ? handleAddMenu({
                                    name: el?.name,
                                    link: el?.endpoint
                                      ? `${process.env.NEXT_PUBLIC_APP_URL}/` +
                                        el?.endpoint
                                      : `${process.env.NEXT_PUBLIC_APP_URL}/`,
                                    type: 0,
                                    subMenus: [],
                                    id: el?.id,
                                  })
                                : handleRemoveMenu(el?.id)
                            }
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>

                        <ListItemText
                          id={labelId}
                          primary={
                            <span style={{ fontSize: "18px" }}>{el?.name}</span>
                          }
                          secondary={
                            el?.published === 1 ? (
                              <span
                                style={{ fontSize: "smaller", color: "green" }}
                              >
                                {"Published"}
                              </span>
                            ) : (
                              <span
                                style={{ fontSize: "smaller", color: "red" }}
                              >
                                {"Draft"}
                              </span>
                            )
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
            <ListItemButton
              onClick={() => setCustomLinkMenu(!customLinkMenu)}
              sx={{
                backgroundColor: "#eeeeee",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
              }}
            >
              <ListItemText primary={"Custom Link"} />
              {customLinkMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={customLinkMenu}
              sx={{
                border: "1px solid #cfcfcf",
                padding: "10px",
              }}
            >
              <Box marginBottom={"10px"}>
                <InputLabel>Link Text</InputLabel>
                <TextField
                  value={customLinkText}
                  onChange={(e) => setCustomLinkText(e.target.value)}
                />
              </Box>
              <Box marginBottom={"10px"}>
                <InputLabel>Link</InputLabel>
                <TextField
                  value={customLink}
                  onChange={(e) => setCustomLink(e.target.value)}
                />
              </Box>
              <Box
                display={"flex"}
                justifyContent={"end"}
                alignItems={"center"}
                padding={"7px"}
                borderTop={"0.5px solid #d2d2d2"}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#F07539",
                    fontWeight: "bold",
                    border: "1px solid #F07539",
                    ":hover": {
                      backgroundColor: "#fff",
                      color: "#F07539",
                      border: "1px solid #F07539",
                    },
                    marginRight: "10px",
                  }}
                  onClick={() =>
                    handleAddMenu({
                      id: uuid(),
                      name: customLinkText,
                      type: 1,
                      link: customLink,
                      subMenus: [],
                    })
                  }
                >
                  Add to Menu
                </Button>
              </Box>
            </Collapse>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box
            border={"1px solid #eeeeee"}
            borderRadius={"6px"}
            minHeight={"600px"}
          >
            <Box
              backgroundColor={"#f2f2f2"}
              marginBottom={"10px"}
              padding={"15px"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography variant="h5">Menus</Typography>
              {selectedMenuName ? (
                <Button
                  variant="contained"
                  backgroundColor={"#F07539"}
                  onClick={() => handleUpdateSubmit()}
                  sx={{
                    backgroundColor: "#F07539",
                    fontWeight: "bold",
                    border: "1px solid #F07539",
                    ":hover": {
                      backgroundColor: "#fff",
                      color: "#F07539",
                      border: "1px solid #F07539",
                    },
                    marginRight: "10px",
                  }}
                >
                  Update Menu
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => handleAddSubmit()}
                  sx={{
                    backgroundColor: "#F07539",
                    fontWeight: "bold",
                    border: "1px solid #F07539",
                    ":hover": {
                      backgroundColor: "#fff",
                      color: "#F07539",
                      border: "1px solid #F07539",
                    },
                    marginRight: "10px",
                  }}
                >
                  Save Menu
                </Button>
              )}
            </Box>
            <Box padding={"20px"}>
              <InputLabel>Menu Name</InputLabel>
              <TextField
                fullWidth
                padding={"5px"}
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
              />
            </Box>
            <Box sx={{ padding: "15px" }}>
              {menuData?.map((el, index) => {
                return (
                  <Box
                    key={el?.id}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"start"}
                    marginBottom={"30px"}
                  >
                    <MainMenu
                      name={el?.name}
                      type={el?.type}
                      url={el?.link}
                      removeMenu={() => handleRemoveMenu(el?.id)}
                      sendUpdate={(name, link) =>
                        handleUpdateMenuData(name, link, index)
                      }
                    />
                                        <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      gap={1}
                    >
                      {/* Move Up Button */}
                      <IconButton
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        sx={{
                          backgroundColor: "#f2f2f2",
                          border: "1px solid #dcdcdc",
                          width: "45px",
                          height: "45px",

                          "&:hover": {
                            backgroundColor: "#e5e5e5",
                          },

                          "&.Mui-disabled": {
                            backgroundColor: "#f9f9f9",
                            opacity: 0.5,
                          },
                        }}
                      >
                        <KeyboardArrowUpIcon />
                      </IconButton>

                      {/* Move Down Button */}
                      <IconButton
                        onClick={() => handleMoveDown(index)}
                        disabled={index === menuData.length - 1}
                        sx={{
                          backgroundColor: "#f2f2f2",
                          border: "1px solid #dcdcdc",
                          width: "45px",
                          height: "45px",

                          "&:hover": {
                            backgroundColor: "#e5e5e5",
                          },

                          "&.Mui-disabled": {
                            backgroundColor: "#f9f9f9",
                            opacity: 0.5,
                          },
                        }}
                      >
                        <KeyboardArrowDownIcon />
                      </IconButton>

                      {/* Add Submenu Button */}
                      <IconButton
                        onClick={() =>
                          onOpen(
                            {
                              allPages,
                              menuIndex: index,
                              name: el?.name,
                              currSubMenuData: menuData[index].subMenus,
                            },
                            "subMenu"
                          )
                        }
                        sx={{
                          backgroundColor: "#F07539",
                          color: "#ffffff",
                          width: "45px",
                          height: "45px",

                          "&:hover": {
                            backgroundColor: "#f5c76a",
                          },
                        }}
                      >
                        <AddBoxIcon sx={{ fontSize: "28px" }} />
                      </IconButton>
                    </Box>
                    <Box width={"40%"}>
                      {el?.subMenus?.length > 0 ? (
                       el?.subMenus?.map((submenu, subIndex) => {
                        return (
                          <Box
                            key={submenu?.id}
                            display="flex"
                            alignItems="flex-start"
                            gap={1}
                            marginBottom="12px"
                          >
                            {/* Submenu Card */}
                            <MainMenu
                              width={"100%"}
                              name={submenu?.name}
                              type={submenu?.type}
                              url={submenu?.link}
                              removeMenu={() =>
                                handleSubMenuRemove(index, submenu?.id)
                              }
                              sendUpdate={(name, link) =>
                                handleUpdateSubMenu(name, link, index, subIndex)
                              }
                            />
                      
                            {/* Submenu Controls */}
                            <Box
                              display="flex"
                              flexDirection="column"
                              gap={1}
                            >
                              {/* Move Up */}
                              <IconButton
                                onClick={() =>
                                  handleSubMenuMoveUp(index, subIndex)
                                }
                                disabled={subIndex === 0}
                                sx={{
                                  backgroundColor: "#f2f2f2",
                                  border: "1px solid #ddd",
                                  width: "40px",
                                  height: "40px",
                      
                                  "&:hover": {
                                    backgroundColor: "#e5e5e5",
                                  },
                      
                                  "&.Mui-disabled": {
                                    opacity: 0.5,
                                  },
                                }}
                              >
                                <KeyboardArrowUpIcon fontSize="small" />
                              </IconButton>
                      
                              {/* Move Down */}
                              <IconButton
                                onClick={() =>
                                  handleSubMenuMoveDown(index, subIndex)
                                }
                                disabled={
                                  subIndex === el?.subMenus?.length - 1
                                }
                                sx={{
                                  backgroundColor: "#f2f2f2",
                                  border: "1px solid #ddd",
                                  width: "40px",
                                  height: "40px",
                      
                                  "&:hover": {
                                    backgroundColor: "#e5e5e5",
                                  },
                      
                                  "&.Mui-disabled": {
                                    opacity: 0.5,
                                  },
                                }}
                              >
                                <KeyboardArrowDownIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        );
                      })
                      ) : (
                        <>
                          <Box width={"40%"}></Box>
                        </>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainHeader;
