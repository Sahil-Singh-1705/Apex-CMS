"use client";
import {
  Box,
  Collapse,
  Grid,
  InputLabel,
  TextField,
  Divider,
  Button,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useEffect, useState } from "react";

const MainMenu = ({ name, url, type, width, removeMenu, sendUpdate }) => {
  const [mainMenu, setMainMenu] = useState(false);
  const [link, setLink] = useState("");
  const [linkText, setLinkText] = useState(name);

  useEffect(() => {
    if (url) {
      setLink(url);
    }
  }, [url]);

  // useEffect(() => {

  // }, []);

  const handleUpdate = () => {
    sendUpdate(linkText, link);
  };

  return (
    <Box width={!width ? "50%" : width}>
      <ListItemButton
        onClick={() => setMainMenu(!mainMenu)}
        sx={{
          backgroundColor: "#eeeeee",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      >
        <ListItemText
          primary={type === 1 ? name + " - " + "Custom Link" : name}
        />
        {mainMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={mainMenu}
        sx={{
          border: "1px solid #cfcfcf",
          padding: mainMenu ? "10px" : "0px",
        }}
      >
        <Box paddingBottom={"10px"}>
          <InputLabel>Link Text</InputLabel>
          <TextField
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
          />
        </Box>
        <Box paddingBottom={"10px"}>
          <InputLabel>Link</InputLabel>
          <TextField value={link} onChange={(e) => setLink(e.target.value)} />
        </Box>
        <Divider />
        <Box paddingTop={"10px"}>
          <Button
            sx={{ color: "red", marginRight: "10px" }}
            onClick={() => removeMenu()}
          >
            Remove
          </Button>
          <Button onClick={() => handleUpdate()} sx={{ color: "ff9100" }}>
            Update
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default MainMenu;
