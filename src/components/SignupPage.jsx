import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  Card,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpPage = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setSuccessMessage("User created successfully");
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      setErrorMessage(`Error creating user: ${error.message}`);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordRequirements({
      length: e.target.value.length >= 8,
      lowercase: /[a-z]/.test(e.target.value),
      uppercase: /[A-Z]/.test(e.target.value),
      number: /\d/.test(e.target.value),
      special: /\W/.test(e.target.value),
    });
  };

  const passwordRequirementsList = (
    <ul>
      <li
        style={{ color: passwordRequirements.length ? "#2b8a3e" : "#f03e3e" }}
      >
        Password must be at least 8 characters long.
      </li>

      <li
        style={{
          color: passwordRequirements.lowercase ? "#2b8a3e" : "#f03e3e",
        }}
      >
        Password must contain at least one lowercase letter.{" "}
      </li>
      <li
        style={{
          color: passwordRequirements.uppercase ? "#2b8a3e" : "#f03e3e",
        }}
      >
        Password must contain at least one uppercase letter.{" "}
      </li>
      <li
        style={{ color: passwordRequirements.number ? "#2b8a3e" : "#f03e3e" }}
      >
        Password must contain at least one number.{" "}
      </li>
      <li
        style={{ color: passwordRequirements.special ? "#2b8a3e" : "#f03e3e" }}
      >
        Password must contain at least one special character.{" "}
      </li>
    </ul>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "8vh",
      }}
    >
      <Card
        sx={{
          borderRadius: 9,
          padding: "3rem",
          background:
            "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(249,248,248,1) 100%);",
        }}
      >
    <Typography variant="h5"  sx={{fontWeight:'bold',borderBottom:'2px solid #1976d2',padding:2}}>
      Sign Up with your Email and Password!
    </Typography>
        <Box sx={{ display: "flex", mt: 2 }}>
          {successMessage && (
            <Alert
              sx={{ right: 1 }}
              severity="success"
              onClose={() => setSuccessMessage("")}
            >
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" onClose={() => setErrorMessage("")}>
              {errorMessage}
            </Alert>
          )}
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            required
            fullWidth
            label="Display Name"
            name="displayName"
            autoFocus
            variant="standard"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{
              pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            variant="standard"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
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
          {password && passwordRequirementsList}
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <Button
            type="submit"
            variant="contained"
            className="btn-bg-color"
            sx={{ mt: 3, mb: 2, width: "300px", p: 1.5 }}
          >
            Sign up
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default SignUpPage;
