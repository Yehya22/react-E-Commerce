import { Box, Button } from "@mui/material";
import { SortBy } from "../utils/sortBy";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "../index.css";
const Sort = ({ setProducts }) => {
  const handleSortBy = (sortOrder) => {
    SortBy(sortOrder, setProducts);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "fit-content",
        backgroundColor: "#f8f9fa",
        p: 1,
        mt: 2,
        alignSelf: "flex-end",
        borderRadius: 2,
      }}
    >
      <Button
        title="priceHighToLow"
        onClick={() => handleSortBy("priceHighToLow")}
      >
        <ArrowUpwardIcon className="rate-btn" />
      </Button>
      <Button
        title="priceLowToHigh"
        onClick={() => handleSortBy("priceLowToHigh")}
      >
        <ArrowDownwardIcon className="rate-btn" />
      </Button>
      <Button
        title="ratingHighToLow"
        onClick={() => handleSortBy("ratingHighToLow")}
      >
        <ThumbUpAltOutlinedIcon className="rate-btn" />
      </Button>
      <Button
        title="ratingLowToHigh"
        onClick={() => handleSortBy("ratingLowToHigh")}
      >
        <ThumbDownOutlinedIcon className="rate-btn" />
      </Button>
    </Box>
  );
};

export default Sort;
