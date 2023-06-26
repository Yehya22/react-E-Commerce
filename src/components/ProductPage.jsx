import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import "../index.css";
import StarIcon from "@mui/icons-material/Star";
import Page404 from "./Page404";
import { addProductToCart } from "../utils/addProductToCart";
const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const addToCart = addProductToCart();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const clearMessage = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  let bgColor;
  if (product?.rating?.rate >= 0 && product?.rating?.rate < 1) {
    bgColor = "#ff4545";
  } else if (product?.rating?.rate >= 1 && product?.rating?.rate < 2) {
    bgColor = "#ffa534";
  } else if (product?.rating.rate >= 2 && product?.rating?.rate < 3) {
    bgColor = "#fcc419";
  } else if (product?.rating?.rate >= 3 && product?.rating?.rate < 4) {
    bgColor = "#b7dd29";
  } else {
    bgColor = "#66a80f";
  }

  const handleCategoryClick = () => {
    navigate(`/categories/${product?.category}`);
  };

  const handleAddToCartClick = () => {
    const { successMessage, errorMessage } = addToCart(product);
    setSuccessMessage(successMessage);
    setErrorMessage(errorMessage);

    setTimeout(clearMessage, 2000);
  };

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : product ? (
        <Box className="container-bottom-to-up">
          <Box sx={{ display: "flex" }}>
            {successMessage && (
              <Alert
                sx={{ right: 1 }}
                severity="success"
                onClose={() => setSuccessMessage("")}
                className="success-alert"
              >
                {successMessage}
              </Alert>
            )}
            {errorMessage && (
              <Alert
                sx={{ right: 1 }}
                severity="error"
                onClose={() => setErrorMessage("")}
                className="success-alert"
              >
                {errorMessage}
              </Alert>
            )}
          </Box>
          <Box sx={{ height: "100%" }}>
            <CardMedia
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: hovered ? "scale(1.01)" : "scale(1)",
                transition: "transform 0.3s ease-in-out",
                mt: 5,
              }}
            >
              <img
                loading="lazy"
                src={product?.image}
                height={180}
                alt={product?.title}
              />
            </CardMedia>
            <Typography
              variant="h1"
              sx={{
                animationDuration: "1000ms",
                fontSize: "22px",
                mt: 4,
                fontWeight: 700,
              }}
            >
              {product?.title}
            </Typography>{" "}
            <Button
              onClick={handleCategoryClick}
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
                mt: 1,

                ":hover": {
                  backgroundColor: "#1976d2",
                },
              }}
              className="card-text"
            >
              {" "}
              {product?.category}
            </Button>
            <br />
            <Typography
              variant="subtitle1"
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
              {product?.rating?.rate}
              <StarIcon sx={{ color: "#fff", fontSize: "small" }} />
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 2 }}>
              {product?.price} $
            </Typography>
            <Typography sx={{ mb: 6 }} variant="h6">
              {product?.description}
            </Typography>
            <Button
              sx={{
                width: "100%",
                position: "fixed",
                p: 1.5,
                bottom: 0,
                right: 0,
              }}
              className="btn-bg-color"
              variant="contained"
              onClick={handleAddToCartClick}
            >
              Add To Cart
            </Button>
          </Box>
        </Box>
      ) : (
        <Page404 />
      )}
    </>
  );
};

export default ProductPage;
