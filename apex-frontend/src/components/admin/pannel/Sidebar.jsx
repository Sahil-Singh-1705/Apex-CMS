"use client";

import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LayersIcon from "@mui/icons-material/Layers";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import WidgetsIcon from "@mui/icons-material/Widgets";
import TuneIcon from "@mui/icons-material/Tune";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import { DrawerHeader } from "./Header";

import { Collapse, Grid } from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  StarBorder,
  Widgets,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";

function PageLoader({ loading }) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <BeatLoader color="#F07539" />
    </div>
  );
}

function SubMenu({ mainTitle, subMenus, icon, onNavigate }) {
  const [subMenu, setSubmenu] = useState(false);

  const handleClick = () => {
    setSubmenu(!subMenu);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon style={{ padding: "0px 4px",  color: "#F07539" }}>{icon}</ListItemIcon>
        <ListItemText primary={mainTitle} />
        {subMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={subMenu} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{ backgroundColor: "#efefef" }}
        >
          {subMenus?.map((el, index) => (
            <ListItemButton
              key={index}
              sx={{ textAlign: "center" }}
              onClick={() => onNavigate(el.link)}
            >
              <ListItemText primary={el.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}

function Sidebar({ drawerWidth, open, setOpen }) {
  const theme = useTheme();

  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  const handleNavigation = (link) => {
    if (pathname === link) {
      setLoading(false);
      return;
    }
  
    setLoading(true);
  
    setTimeout(() => {
      router.push(link);
    }, 150);
  };

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    backgroundColor: "black",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  return (
    <>
      <PageLoader loading={loading} />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader className={`bg-white  ${open ? "" : "mb-10"}`}>
          <Grid container alignItems="center ">
            <Grid
              item
              xs={10}
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
              }}
            >
              <a href="/" target="_blank">
                <img
                  src="/images/apex-cms-logo01.png"
                  alt="Mainlogo"
                  className="h-20 w-20"
                />
              </a>
            </Grid>

            <Grid item xs={2}>
              <IconButton onClick={() => setOpen(false)}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon className="text-black" />
                ) : (
                  <ChevronLeftIcon className="text-black" />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </DrawerHeader>

        <Divider />

        <List className=" ">
          <SubMenu
            mainTitle={"Menu"}
            icon={<WidgetsIcon />}
            onNavigate={handleNavigation}
            subMenus={[
              {
                name: "Menus",
                icon: "",
                link: "/admin/default/mainheader",
              },
              {
                name: "Footer Details",
                icon: "",
                link: "/admin/footer-editor",
              },
            ]}
          />

          <SubMenu
            mainTitle={"Pages"}
            icon={<LayersIcon />}
            onNavigate={handleNavigation}
            subMenus={[
              {
                name: "All Pages",
                icon: "",
                link: `/admin/app-pages/all`,
              },
              {
                name: "Add Page",
                icon: "",
                link: "/admin/app-pages/add",
              },
            ]}
          />

          <SubMenu
            mainTitle={"Blogs"}
            icon={<AssignmentIcon />}
            onNavigate={handleNavigation}
            subMenus={[
              {
                name: "All Blogs",
                icon: "",
                link: `/admin/blog/all`,
              },
              {
                name: "Add Blogs",
                icon: "",
                link: "/admin/blog/add",
              },
              {
                name: "Category",
                icon: "",
                link: "/admin/blog/categories/add",
              },
            ]}
          />

          {/* <SubMenu
            mainTitle={"News"}
            icon={<AssignmentIcon />}
            onNavigate={handleNavigation}
            subMenus={[
              {
                name: "All News",
                icon: "",
                link: `/admin/blog/all`,
              },
              {
                name: "Add News",
                icon: "",
                link: "/admin/news/add",
              },
              {
                name: "Category",
                icon: "",
                link: "/admin/blog/categories/add",
              },
            ]}
          /> */}

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleNavigation("/admin/contact")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#F07539",
                }}
              >
                <ContactPageIcon />
              </ListItemIcon>
              <ListItemText
                primary="Contact"
                sx={{ opacity: open ? 1 : 0, color: "#000000DE" }}
              />
            </ListItemButton>
          </ListItem>

          {/* <Link href="/admin/queries">
        <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
               
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
              <QuestionAnswerIcon/>
              </ListItemIcon>
              <ListItemText primary="Queries" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          </Link> */}
          {/* <SubMenu
          mainTitle={"Pop Up"}
          icon ={<BrandingWatermarkIcon/>}
          subMenus={[
            {
              name: "All Pop Ups",
              icon: "",
              link: `/admin/popup/all`,
            },
            {
              name: "Add Pop Ups",
              icon: "",
              link: "/admin/popup/add",
            },
          

          ]}
        /> */}
          {/* <SubMenu
          mainTitle={"Slider"}
          icon ={<TuneIcon/>}
          subMenus={[
            {
              name: "All Slider",
              icon: "",
              link: `/admin/slider/all`,
            },
            {
              name: "Add Slider",
              icon: "",
              link: "/admin/slider/add",
            },
          

          ]}
        /> */}

          {/* {["All mail"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}  */}
          {/* <Link href="/admin/company-details">
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <TuneIcon/>
              </ListItemIcon>
              <ListItemText primary="Company-details" sx={{ opacity: open ? 1 : 0,color:"#000000DE" }}  />
            </ListItemButton>
          </ListItem>
        </Link> */}

          {/* <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleNavigation("/admin/tickets")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#F07539",
                }}
              >
                <ReceiptLongRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Tickets"
                sx={{ opacity: open ? 1 : 0, color: "#000000DE" }}
              />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar;
