import React, { useContext, useState } from "react";
import { Button, Menu, MenuItem, Container, Box, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { ProductsContext } from "./ProductsContext";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import removeFromCart from "../utils/removeProducts";
import "../index.css";

const Cart = ({ menuOpen, setMenuOpen }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    cartItems,
    setCartItems,
    increaseQuantity,
    decreaseQuantity,
    currentUser,
  } = useContext(ProductsContext);

  const handleRemoveItem = (item) => {
    removeFromCart(
      item,
      cartItems,
      setCartItems,
      currentUser,
      setSuccessMessage,
      setErrorMessage
    );
  };

  return (
    <Container>
      {successMessage && (
        <Alert
          sx={{
            position: "fixed",
            left: 0,
            top: 70,
          }}
          className="success-alert"
          severity="success"
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage("")}>
          {errorMessage}
        </Alert>
      )}
      <Menu
        anchorEl={document.getElementById("cart-button")}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorOrigin={{
          horizontal: "right",
          vertical: 40,
        }}
      >
        {currentUser ? (
          <Box>
            {cartItems.length > 0 ? (
              <ul style={{ margin: 0, padding: 0, marginLeft: "12px" }}>
                {cartItems.map((item) => (
                  <li
                    className="list-item"
                    key={item.id}
                    style={{ position: "relative" }}
                  >
                    {" "}
                    <img alt="product-img" src={item.image} height={35} loading="lazy"></img>
                    <span style={{ color: "#000", margin: "5px" }}>
                      &#x25cf;
                    </span>
                    {item.name}
                    <Button
                      onClick={() => decreaseQuantity(item)}
                      variant="text"
                      style={{ marginLeft: "10px" }}
                    >
                      <RemoveIcon />
                    </Button>
                    <span style={{ margin: "5px" }}>{item.quantity}</span>
                    <Button
                      onClick={() => increaseQuantity(item)}
                      variant="text"
                    >
                      <AddIcon />
                    </Button>
                    <Button
                      sx={{ position: "absoulte", right: 0 }}
                      onClick={() => handleRemoveItem(item)}
                    >
                      <ClearRoundedIcon />
                    </Button>
                  </li>
                ))}
                <Button
                  className="btn-bg-color"
                  component={Link}
                  to="/checkout"
                  variant="contained"
                >
                  Go to Checkout Page
                </Button>
              </ul>
            ) : (
              <MenuItem>
                No items available in your Cart. Try adding some to view them
                here!
              </MenuItem>
            )}
          </Box>
        ) : (
          <MenuItem>
            You are not logged in. Log in to be able to add items to your cart!
          </MenuItem>
        )}
      </Menu>
    </Container>
  );
};

export default Cart;
