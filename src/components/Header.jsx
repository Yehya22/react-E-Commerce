import React, { useContext, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../public/Shopping-cart.svg";
import { Button, Alert, Box } from "@mui/material";
import { ProductsContext } from "./ProductsContext";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Badge from "@mui/material/Badge";
import CategoriesDrawer from "./CategoriesDrawer";
import "../index.css";
import Cart from "./Cart";
import ProfileMenu from "./Menu";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useContext(ProductsContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <Box>
      <header style={{ backgroundColor: "#f8f9fa" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "abso",
            top: 0,
            left: 1,
            right: 0,
            zIndex: 2,
          }}
        >
          {message && (
            <Alert
              severity="success"
              onClose={() => setMessage("")}
              className="success-alert"
            >
              {message}
            </Alert>
          )}
        </Box>
        <Toolbar sx={{ ml: -4 }}>
          <CategoriesDrawer toggleDrawer={toggleDrawer} isOpen={isOpen} />

          <a href="/">
            <img
              loading="lazy"
              src={logo}
              alt="logo"
              height={60}
            />
          </a>

          <ProfileMenu setMessage={setMessage} />
          <Cart menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <Button
            sx={{
              color: "#000",
              mr: 5,
              ":hover": {
                color: "#1976d2",
                backgroundColor: "transparent",
              },
              "&:focus": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            id="cart-button"
          >
            <ShoppingBagOutlinedIcon className="profile" />
            <Badge
              sx={{ mb: 3 }}
              badgeContent={cartItems.length}
              color="warning"
            ></Badge>{" "}
          </Button>
        </Toolbar>
      </header>
    </Box>
  );
};

export default Header;
