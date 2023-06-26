import { Box,  Grid, Typography } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
const Footer = () => {
  const handleViewCartClick = () => {
    const header = document.querySelector("header");
    header.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        mt: 10,
        p: 2,
        backgroundColor: "#f1f3f5",
        borderRadius: 2,
        borderTop: "4px solid #1976d2",
      }}
    >
      <Grid container spacing={4} alignItems="flex-start">
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              display: "inline-block",
              borderBottom: "2px solid #1976d2",
            }}
          >
            Contact
          </Typography>
          <Typography
            className="contact-items"
            variant="body1"
            sx={{ fontWeight: "bold", display: "flex", flexDirection: "row" }}
          >
            Adress:{" "}
            <Typography sx={{ml:0.5}} className="secondary-text">23 North Pl</Typography>
          </Typography>
          <Typography
            className="contact-items"
            variant="body1"
            sx={{ fontWeight: "bold", display: "flex", flexDirection: "row" }}
          >
            Phone:{" "}
            <Typography sx={{ml:0.5}} className="secondary-text">+1 234-567-8912</Typography>
          </Typography>
          <Typography
            className="contact-items"
            variant="body1"
            sx={{
              fontWeight: "bold",
              display: "flex",
              flexDirection: "row",
              mb: 1,
            }}
          >
            Hours:{" "}
            <Typography sx={{ml:0.5}} className="secondary-text"> 10:00 - 18:00</Typography>
          </Typography>
          <Box sx={{ mt: 1 }}>
            <FacebookIcon
              className="social-icons"
              sx={{
                ":hover": {
                  color: "#3b5998",
                },
              }}
            />
            <TwitterIcon
              className="social-icons"
              sx={{
                ":hover": {
                  color: "#1da1f2",
                },
              }}
            />
            <InstagramIcon
              className="social-icons"
              sx={{
                ":hover": {
                  color: "#c13584",
                },
              }}
            />
            <YouTubeIcon
              className="social-icons"
              sx={{
                ":hover": {
                  color: "#cd201f",
                },
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              display: "inline-block",
              borderBottom: "2px solid #1976d2",
            }}
          >
            About
          </Typography>

          <Typography className="footer-links">About us</Typography>
          <Typography className="footer-links">Privacy Policy</Typography>
          <Typography className="footer-links">Terms & Conditions</Typography>
          <Typography className="footer-links">Contact Us</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              display: "inline-block",
              borderBottom: "2px solid #1976d2",
            }}
          >
            My Account
          </Typography>
          <Typography component={Link} to="/Login" className="footer-links">
            Sign In
          </Typography>
          <Typography className="footer-links" onClick={handleViewCartClick}>
            View Cart
          </Typography>
          <Typography className="footer-links">My Wishlist</Typography>
          <Typography className="footer-links">Help</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
