import React from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./components/CategoryPage";
import { ProductsProvider } from "../src/components/ProductsContext";
import ProductPage from "./components/ProductPage";
import Page404 from "./components/Page404";
import CheckoutPage from "./components/CheckoutPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ProfilePage from "./components/ProfilePage";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Cairo",
      fontWeightRegular: 600,
      fontWeightBold: 700,
    },
  });

  return (
    <ProductsProvider>
      <BrowserRouter>
        <Stack>
          <ThemeProvider theme={theme}>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories/:category" element={<CategoryPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/checkout/" element={<CheckoutPage />} />
              <Route path="/login/" element={<LoginPage />} />
              <Route path="/signup/" element={<SignupPage />} />
              <Route path="/profilepage/" element={<ProfilePage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </ThemeProvider>
        </Stack>
      </BrowserRouter>
    </ProductsProvider>
  );
};

export default App;
