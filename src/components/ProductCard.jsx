import React, { useState } from "react";
import {
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  let bgColor;
  if (product.rating.rate >= 0 && product.rating.rate < 1) {
    bgColor = "#ff4545";
  } else if (product.rating.rate >= 1 && product.rating.rate < 2) {
    bgColor = "#ffa534";
  } else if (product.rating.rate >= 2 && product.rating.rate < 3) {
    bgColor = "#fcc419";
  } else if (product.rating.rate >= 3 && product.rating.rate < 4) {
    bgColor = "#b7dd29";
  } else {
    bgColor = "#66a80f";
  }

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Box sx={{ width: "auto", height: "auto" }}>
      <Link className="links" to={`/products/${product.id}`}>
        <Card
          sx={{
            width: "auto",
            mt: 9,
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
            "@media (max-width: 1088px)": {
              "& .box-container": {
                display: "block",
              },
            },
          }}
          key={product.id}
        >
          <CardMedia
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: hovered ? "scale(1.02)" : "scale(1)",
              transition: "transform 0.3s ease-in-out",
            }}
            key={product.id}
          >
            <img loading="lazy" src={product.image} height={200} alt={product.title} />
          </CardMedia>

          <CardContent>
            <Typography
              sx={{
                fontWeight: 700,
                ":hover": {
                  color: "#1976d2",
                },
              }}
              className="card-text"
            >
              {product.title}
            </Typography>

            <Typography sx={{ fontWeight: 700 }} className="card-text">
              {product.price} $
            </Typography>
            <Box
              className="box-container"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="text"
                sx={{
                  color: "#fff",
                  display: "inline-block",
                  padding: "6px 6px",
                  fontSize: "10px",
                  backgroundColor: "#1976d2",
                  border: "1px solid #1976d2",
                  fontWeight: 700,
                  borderRadius: 2,
                  mb: 1,
                  ":hover": {
                    backgroundColor: "#1976d2",
                  },
                }}
                className="card-text"
              >
                {" "}
                {product.category}
              </Button>

              <br />
              <Typography
                className="card-text"
                sx={{
                  display: "inline-block",
                  padding: "6px 8px",
                  fontSize: "14px",
                  backgroundColor: bgColor,
                  border: "1px solid bgColor ",
                  borderRadius: 2,
                  color: "#fff",
                  mb: 1,
                  fontWeight: 700,
                }}
              >
                {" "}
                {product.rating.rate}
                <StarIcon sx={{ color: "#fff", fontSize: "small" }} />
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default ProductCard;
