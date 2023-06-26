import React, { useContext, useState, useEffect } from "react";
import {
  useMediaQuery,
  CircularProgress,
  Box,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { ProductsContext } from "./ProductsContext";
import getProducts from "../utils/getProducts";
import Hero from "./Hero";
import Sort from "./Sort";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
const HomePage = () => {
  const isSmallScreen = useMediaQuery("(max-width:1022px)");
  const isExtraSmallScreen = useMediaQuery("(max-width:600px)");

  const { products, setProducts } = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

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
      ) : (
        <>
          <Hero />
          <Sort setProducts={setProducts} />
          <Box
            id="products"
            sx={{
              display: "grid",
              gridTemplateColumns: isExtraSmallScreen
                ? "repeat(1, 1fr)"
                : isSmallScreen
                ? "repeat(2, 1fr)"
                : "repeat(4,1fr)",
              gap: 2,
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
          <Newsletter />
          <Footer />
        </>
      )}
    </>
  );
};

export default HomePage;
