import React from "react";
import { Box, Button, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Box
        sx={{
          p: 3,
          textAlign: "center",
        }}
      >
        <CardMedia>
          <img alt="Notfound-img" loading="lazy" src="../Not-Found.svg"></img>
        </CardMedia>
        <Button
          className="btn-bg-color"
          component={Link}
          to="/"
          sx={{ p: 1.5, width: "250px" }}
          variant="contained"
        >
          Return to HomePage
        </Button>
      </Box>
    </Box>
  );
};

export default Page404;
