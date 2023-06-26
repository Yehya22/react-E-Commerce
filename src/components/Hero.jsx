import { useState } from "react";
import { CardMedia, Button, Box, Typography, Grid, Card } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import shopping1 from "../../public/shopping1.jpg";
import shopping2 from "../../public/shopping2.jpg";
import shopping3 from "../../public/shopping3.jpg";
import shopping4 from "../../public/shopping4.jpg";
import "animate.css";

const Hero = () => {
  const handleProductsSection = () => {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  };

  const images = [shopping1, shopping2, shopping3, shopping4];

  const [imageIndex, setImageIndex] = useState(0);

  const handleImageChange = (index) => {
    setImageIndex(index);
  };

  return (
    <Box sx={{ backgroundColor: "#f1f3f5" }}>
      <Grid container sx={{ justifyContent: "center", alignItems: "center" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              mb: 2,
              mt: { xs: 4, sm: 8 },
              padding: { xs: "0 10px", sm: "0 20px", md: "0 40px" },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                animationName: "fadeInLeft",
                animationDuration: "1000ms",
                mb: 2,
                fontSize: { xs: "28px", sm: "32px" },
              }}
            >
              Shop smarter, not harder
            </Typography>

            <Typography
              variant="h3"
              sx={{
                animationName: "fadeInRight",
                animationDuration: "1000ms",
                fontSize: { xs: "18px", sm: "22px" },
              }}
            >
              Find the best products with the best prices
            </Typography>

            <Button
              variant="contained"
              onClick={handleProductsSection}
              sx={{
                animationName: "bounceIn",
                animationDuration: "1000ms",
                mt: 2,
                backgroundColor: "#f1f3f5",
                mb: 2,
                color: "#000",
                ":hover": {
                  color: "#fff",
                  backgroundColor: "#000",
                },
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            sx={{
              maxWidth: { xs: 250, sm: 300, md: 350 },
              mt: 2,
              mb: 2,
            }}
          >
            <Carousel
              onChange={handleImageChange}
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              interval={3000}
              showArrows={false}
            >
              {images.map((image, index) => (
                <Box key={index}>
                  <CardMedia
                    component="img"
                    image={image}
                    alt={`Shopping ${index}`}
                  />
                </Box>
              ))}
            </Carousel>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
