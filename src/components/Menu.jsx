import { useContext, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { ProductsContext } from "./ProductsContext";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { getAuth } from "firebase/auth";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
const ProfileMenu = ({ setMessage }) => {
  const { currentUser } = useContext(ProductsContext);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    getAuth()
      .signOut()
      .then(() => {
        localStorage.removeItem("getAuth");
        setMessage("Logout Successfully!");
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        alert(`Error occurred during sign-out process: ${error.message}`);
      });
  };

  return (
    <>
      <Button
        variant="text"
        sx={{
          position: "absolute",
          right: 1,

          ":hover": {
            backgroundColor: "transparent",
          },
          "&:focus": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        onClick={() => setAccountMenuOpen(!accountMenuOpen)}
        id="menu-btn"
      >
        <AccountCircleOutlinedIcon
          className="profile"
          sx={{
            fontSize: "28px",
            color: "#343a40",
            ":hover": {
              color: "#1c7ed6",
            },
          }}
        />
      </Button>
      <Menu
        open={accountMenuOpen}
        onClose={() => setAccountMenuOpen(false)}
        anchorEl={document.getElementById("menu-btn")}
        anchorOrigin={{
          horizontal: "right",
          vertical: 40,
        }}
      >
        {currentUser ? (
          <>
            <Link className="links" to="/profilepage">
              <MenuItem sx={{ mb: 1 }}>
                {currentUser.displayName} 's Profile
              </MenuItem>
            </Link>
            <MenuItem className="links" onClick={handleLogout}>
              Logout
            </MenuItem>
          </>
        ) : (
          <Link className="links" to="/login">
              <MenuItem sx={{ mb: 1 }}>
                Login
              </MenuItem>
            </Link>
        )}
      </Menu>
    </>
  );
};

export default ProfileMenu;
