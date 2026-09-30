"use client";
import { Box, Collapse, Grid, InputLabel, TextField } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";

const SubMenu = ({ name, url }) => {
  const [openSubMenu, setSubMenu] = useState(false);

  return (
    <Box>
      <ListItemButton
        onClick={() => setSubMenu(!openSubMenu)}
        sx={{
          backgroundColor: "#eeeeee",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      >
        <ListItemText primary={"Custom Link"} />
        {openSubMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={openSubMenu}
        sx={{
          border: "1px solid #cfcfcf",
          padding: "10px",
          width: "100%",
        }}
      >
        <InputLabel>Link</InputLabel>
        <TextField size='small' />
      </Collapse>
    </Box>
  );
};

export default SubMenu;
