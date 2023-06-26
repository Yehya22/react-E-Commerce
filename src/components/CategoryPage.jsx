import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ProductsContext } from "./ProductsContext";
import { Box,CircularProgress, Stack, useMediaQuery } from "@mui/material";
import Page404 from "./Page404";
import Sort from "../components/Sort";
const CategoryPage = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [category, setProducts]);

  if (isLoading) {
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
  }

  if (products.length <= 0) {
    return <Page404 />;
  }

  return (
    <>
              <Sort setProducts={setProducts} />

    <Stack
      sx={{
        display: "grid",
        gridTemplateColumns: isSmallScreen ? "repeat(1, 1fr)" : "repeat(2,1fr)",
        gap: 2,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Stack>
    </>
  );
};

export default CategoryPage;
