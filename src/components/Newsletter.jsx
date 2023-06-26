import React, { useState } from "react";
import {
  TextField,
  Typography,
  CardMedia,
  Box,
  Button,
  Dialog,
  Divider,
  DialogContent,
  Alert,
} from "@mui/material";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleOrder = () => {
    if (email.trim() === "") {
      setErrorMessage("Email is required.");
    } else if (!email.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$")) {
      setErrorMessage("Email is not valid.");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        borderTop: "5px solid #495057",
        backgroundColor: "#212a47",
        p: 3,
        borderRadius: 2,
        mt: 10,
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {errorMessage && (
        <Alert
          sx={{
            position: "absolute",
            top: -50,
            left: 1,
          }}
          severity="error"
          onClose={() => setErrorMessage("")}
        >
          {errorMessage}
        </Alert>
      )}
      <Box
        sx={{
          position: "absolute",
          top: -70,
          right: -8,
        }}
      >
        <CardMedia>
          <img alt="Newsletter-img" src="photo-fly.svg" loading="lazy" />
        </CardMedia>
      </Box>

      <Typography sx={{ color: "#fff", fontWeight: "bold" }} variant="h5">
        Subscribe to our Newsletter
      </Typography>
      <Typography variant="body1" sx={{ color: "#fff", mt: 2 }}>
        Get E-mail updates about our latest products and offers!
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          mt: 2,
        }}
      >
        <TextField
          required
          label="Your email adress"
          name="Email"
          variant="filled"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputProps={{
            pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
          }}
          sx={{
            backgroundColor: "#fff",
            width: {
              xs: "auto",
              sm: "100%",
            },
            mb: 2,
          }}
        />
        <Button
          variant="contained"
          sx={{
            p: 2,
            backgroundColor: "#0b7285",
            height: "48px",
            width: {
              xs: "auto",
              sm: "400px",
            },
            ":hover": {
              backgroundColor: "#1098ad",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => {
            try {
              handleOrder();
            } catch (error) {
              alert(error.message);
            }
          }}
        >
          Subscribe!
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: "400px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f1f1f1",
              animationName: "fadeInUp",
              animationDuration: "1000ms",
            },
          }}
        >
          <DialogContent
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
          
            <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
              You Have Subscribed Successfully !
            </Typography>
            <Divider
              sx={{
                height: "2px",
                backgroundColor: "#4bb71b",
              }}
            />
            <div class="success-animation">
              <svg
                class="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  class="checkmark__circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  class="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Newsletter;
