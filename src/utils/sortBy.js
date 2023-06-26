export const SortBy = (sortOrder, setProducts) => {
  if (sortOrder === "priceHighToLow") {
    setProducts((prevProducts) =>
      [...prevProducts].sort((a, b) => b.price - a.price)
    );
  } else if (sortOrder === "priceLowToHigh") {
    setProducts((prevProducts) =>
      [...prevProducts].sort((a, b) => a.price - b.price)
    );
  } else if (sortOrder === "ratingHighToLow") {
    setProducts((prevProducts) =>
      [...prevProducts].sort((a, b) => b.rating.rate - a.rating.rate)
    );
  } else if (sortOrder === "ratingLowToHigh") {
    setProducts((prevProducts) =>
      [...prevProducts].sort((a, b) => a.rating.rate - b.rating.rate)
    );
  }
};
