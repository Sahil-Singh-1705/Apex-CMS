"use client";

import {
  Box,
  Button,
  IconButton,
  Collapse,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { ModalContext } from "@/context/context";
import DialogContentText from "@mui/material/DialogContentText";
import { v4 as uuid } from "uuid";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import MainMenu from "@/components/admin/editor/ui/MainMenu";

const SubMenuModal = ({ handleSubMenu }) => {
  const { data, type, isOpen, onClose } = useContext(ModalContext);
  const isModalOpen = isOpen && type === "subMenu";

  const [menuData, setMenuData] = useState([]);
  const [pageSubMenu, setPageSubmenu] = useState(false);

  // Custom
  const [customLinkMenu, setCustomLinkMenu] = useState(false);
  const [customLinkText, setCustomLinkText] = useState("");
  const [customLink, setCustomLink] = useState("");

  useEffect(() => {
    setMenuData(data?.currSubMenuData);
  }, [data?.currSubMenuData]);

  const handleAddMenu = (menu) => {
    // console.log(menu);
    setMenuData([...menuData, menu]);
    setCustomLinkText("");
    setCustomLink("");
  };

  const handleRemoveMenu = (id) => {
    setMenuData(menuData?.filter((el) => el?.id !== id));
  };

  const addSubMenu = () => {
    handleSubMenu(menuData, data?.menuIndex);
  };

  const handleUpdateMenuData = (name, link, index) => {
    menuData[index].name = name;
    menuData[index].link = link;
    setMenuData([...menuData]);
  };

  // console.log(data?.allPages);

  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={() => onClose({})}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth={"lg"}
        fullScreen={"md"}
        sx={{ padding: "10px" }}
      >
        <Box position={"relative"}>
          <IconButton
            color='black'
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={() => onClose({})}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogTitle
          sx={{ color: "black !important", fontSize: "20px !important" }}
          id='alert-dialog-title'
        >
          {"Add Sub Menu"} - {data?.name}
        </DialogTitle>
        <DialogContent dividers sx={{ paddingTop: "10px" }}>
          <DialogContentText>
            <Grid container columnGap={2} marginTop='50px'>
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
                      {data?.allPages?.data?.map((el) => {
                        const labelId = `checkbox-list-label-${el?.unique}`;
                        return (
                          <ListItem key={el?.uniqueId} disablePadding>
                            <ListItemButton
                              role={undefined}
                              onClick={() => {}}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge='start'
                                  value={el}
                                  checked={menuData?.find(
                                    (menu) => menu?.id === el?.id
                                  ) ? true : false}
                                  onChange={(e) =>
                                    e.target.checked
                                      ? handleAddMenu({
                                          name: el?.name,
                                          link: el?.endpoint !== ""
                                            ? `${process.env.NEXT_PUBLIC_APP_URL}` +
                                              el?.endpoint
                                            : `${process.env.NEXT_PUBLIC_APP_URL}/`,
                                          type: 0,
                                          id: el?.id
                                        })
                                      : handleRemoveMenu(el?.id)
                                  }
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText id={labelId} primary={el?.name} />
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
                        variant='contained'
                        size='small'
                        onClick={() =>
                          handleAddMenu({
                            id: uuid(),
                            name: customLinkText,
                            type: 1,
                            link: customLink,
                          })
                        }
                      >
                        Add to Menu
                      </Button>
                    </Box>
                  </Collapse>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ padding: "15px" }}>
                  {menuData?.map((el, index) => {
                    return (
                      <MainMenu
                        name={el?.name}
                        type={el?.type}
                        url={el?.link}
                        width={"100%"}
                        removeMenu={() => handleRemoveMenu(el?.id)}
                        sendUpdate={(name, link) =>
                          handleUpdateMenuData(name, link, index)
                        }
                      />
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => {
              addSubMenu();
              onClose({});
            }}
            autoFocus
            sx={{
              backgroundColor: "#0093e9",
              fontWeight: "bold",
              border: "1px solid #0093e9",
              ":hover": {
                backgroundColor: "#fff",
                color: "#0093e9",
                border: "1px solid #0093e9",
              },
              marginRight: "10px",
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SubMenuModal;
