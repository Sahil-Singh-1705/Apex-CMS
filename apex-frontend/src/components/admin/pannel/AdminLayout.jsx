"use client";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header, { DrawerHeader } from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

const AdminLayout = ({ children }) => {
  const drawerWidth = 210;

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        drawerWidth={drawerWidth}
        open={open}
        setOpen={(val) => setOpen(val)}
      />
      <Sidebar
        drawerWidth={drawerWidth}
        open={open}
        setOpen={(val) => setOpen(val)}
      />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
