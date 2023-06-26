import { Box, Typography } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import "../index.css";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import DiamondIcon from "@mui/icons-material/Diamond";
import Divider from "@mui/material/Divider";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
const CategoriesDrawer = ({ toggleDrawer, isOpen }) => {
  return (
    <Box>
      <Button
        sx={{
          color: "#212529",
          ":hover": {
            color: "#1976d2",
            backgroundColor: "transparent",
          },
          "&:focus": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </Button>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <List>
          <Link className="links" to="/categories/electronics">
            <ListItem className="list-item" onClick={toggleDrawer}>
              <ListItemText className="categories" primary="ELECTRONICS" />

              <DeveloperBoardIcon className="avatar" />
            </ListItem>
          </Link>

          <Divider className="divider" />
          <Link className="links" to="/categories/men's clothing">
            <ListItem className="list-item" onClick={toggleDrawer}>
              <ListItemText primary="MEN" className="categories" />
              <ManIcon className="avatar" />
            </ListItem>
          </Link>
          <Divider className="divider" />

          <Link className="links" to="/categories/women's clothing">
            <ListItem className="list-item" onClick={toggleDrawer}>
              <ListItemText primary="WOMEN" className="categories" />
              <WomanIcon className="avatar" />
            </ListItem>
          </Link>
          <Divider className="divider" />
          <Link className="links" to="/categories/jewelery">
            <ListItem className="list-item" onClick={toggleDrawer}>
              <ListItemText primary="JEWELERY" className="categories" />
              <DiamondIcon className="avatar" />
            </ListItem>
          </Link>
        </List>
        <Typography
          variant="body2"
          sx={{ bottom: 5, position: "fixed", color: "inherit" }}
        >
          Built with
          <FavoriteIcon
            sx={{ top: 8, position: "relative", color: "red" }}
          />{" "}
          by{" "}
          <Link
            className="links"
            to="https://github.com/Yehya22"
            target="_blank"
            sx={{ color: "inherit" }}
          >
            Yehya22
          </Link>
        </Typography>{" "}
      </Drawer>
    </Box>
  );
};

export default CategoriesDrawer;
