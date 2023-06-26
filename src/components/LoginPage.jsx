import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  Typography,
  Card,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleNormalLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setSuccessMessage("Login Successfully");
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      setErrorMessage(`Login Error : ${error.message}`);
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        setSuccessMessage("Login Successfully");
        setTimeout(() => {
          navigate("/");
        }, 100);
      })
      .catch((error) => {
        setErrorMessage(`Login Error : ${error.message}`);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card
      sx={{
        borderRadius: 9,
        margin: "auto",
        marginTop: "12vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background:
          "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(249,248,248,1) 100%);",
      }}
    >
    <Typography variant="h5"  sx={{fontWeight:'bold',borderBottom:'2px solid #1976d2',padding:2}}>
      Sign In Using Email and Password or using your Google account!
    </Typography>

      <Box sx={{ display: "flex", mt: 1 }}>
        {successMessage && (
          <Alert
            sx={{ mt: 1 }}
            severity="success"
            onClose={() => setSuccessMessage("")}
          >
            {successMessage}
          </Alert>
         
        )}
        {errorMessage && (
          <Alert
            sx={{ mt: 1 }}
            severity="error"
            onClose={() => setErrorMessage("")}
          >
            {errorMessage}
          </Alert>
        )}
      </Box>
      <Box component="form" sx={{ mt: 2 }}>
        <TextField
          required
          fullWidth
          label="Email"
          name="Email"
          variant="standard"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" }}
        />
        <TextField
          margin="normal"
          variant="standard"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        className="btn-bg-color"
        sx={{
          mt: 3,
          mb: 2,
          p: 1.5,
          width: "60%",
        }}
        onClick={handleNormalLogin}
      >
        Login
      </Button>
      <Typography>Or Login Using</Typography>
      <Button
        type="submit"
        sx={{
          mt: 3,
          mb: 2,
          color: "#fff",
          backgroundColor: "#f03e3e",
          ":hover": {
            backgroundColor: "#e03131",
          },
        }}
        onClick={handleGoogleLogin}
      >
        <GoogleIcon />
      </Button>
      <Typography>
        Don't have an account?{" "}
          <Link to="/signup" className="links">
            Signup
          </Link>
      </Typography>
    </Card>
  );
};

export default LoginPage;
