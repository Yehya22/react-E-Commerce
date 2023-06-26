import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Alert,
  Container,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from "@mui/material";
import { ProductsContext } from "./ProductsContext";
import { Button } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import removeFromCart from "../utils/removeProducts";
import { runFireworks } from "../utils/fireWorks";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const {
    cartItems,
    setCartItems,
    increaseQuantity,
    decreaseQuantity,
    currentUser,
  } = useContext(ProductsContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

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

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    setOpen(true);
    runFireworks();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Box>
        {successMessage && (
          <Alert
            sx={{
              position: "absolute",
              left: 1,
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
      </Box>
      <Box>
        {cartItems.length > 0 ? (
          <>
            <TableContainer
              component={Box}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Table
                sx={{
                  width: "auto",
                }}
                aria-label="product table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      Product
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Title</TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="center">
                      Quantity
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="left">
                      Remove
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        <Box sx={{ ml: 15 }}>
                          <img
                            loading="lazy"
                            src={item.image}
                            width={60}
                            alt={item.name}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => increaseQuantity(item)}>
                          +
                        </Button>

                        <Box>{item.quantity}</Box>
                        <Button onClick={() => decreaseQuantity(item)}>
                          -
                        </Button>
                      </TableCell>
                      <TableCell>{item.price}$</TableCell>
                      <TableCell align="right">
                        <Button onClick={() => handleRemoveItem(item)}>
                          <ClearRoundedIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography variant="h5">Total: ${total.toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Button
                className="btn-bg-color"
                sx={{ width: "300px", p: 1 }}
                variant="contained"
                onClick={handleOrder}
              >
                Place Order
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f1f1f1",
                    animationName: "fadeInUp",
                    animationDuration: "1000ms",
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                    Your Order Has been Placed!
                  </Typography>
                </DialogTitle>
                <Divider
                  sx={{
                    height: "2px",
                    backgroundColor: "#4263eb",
                  }}
                />
                <DialogContent
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <CardMedia>
                    <img
                      alt="Order-Confirmed"
                      loading="lazy"
                      src="../Order-Confirmed.svg"
                      width={300}
                    />
                  </CardMedia>

                  <Button
                    component={Link}
                    to="/"
                    sx={{
                      padding: "12px",
                      width: "300px",
                    }}
                    className="btn-bg-color"
                    variant="contained"
                  >
                    Continue Shopping
                  </Button>
                </DialogContent>
              </Dialog>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia>
              <img loading="lazy" src="../public/Shopping-cart.svg" alt="shopping-cart" />
            </CardMedia>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CheckoutPage;
