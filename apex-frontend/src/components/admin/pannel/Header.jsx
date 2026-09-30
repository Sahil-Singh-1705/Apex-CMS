"use client";

import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { logError } from "@/utils/logger";
// DrawerHeader
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function FullScreenLoader({ loading }) {
  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <BeatLoader color="#F07539" />
    </div>
  );
}

const MainHeader = ({ drawerWidth, open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    backgroundColor: "black",
  }));
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        setTimeout(() => {
          router.push("/apx-admin/login");
        }, 300);
      } else {
        logError(new Error(data.message || "Logout failed"), "Logout Failed");
  
        setLoading(false);
      }
  
    } catch (error) {
      logError(error, "Logout API Error");
  
      setLoading(false);
    }
  };

  return (
    <>
      <FullScreenLoader loading={loading} />

      <div>
        <AppBar position="fixed" open={open}>
          <Toolbar variant="dense" sx={{ height: 113 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin Panel
            </Typography>
            <Button
              endIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                ml: "auto",
                px: 2.5,
                py: 1,
                borderRadius: "10px",
                backgroundColor: "#F07539",
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",

                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#000000",
                },
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default MainHeader;
