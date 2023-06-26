import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  Card,
} from "@mui/material";
import { getAuth, deleteUser } from "firebase/auth";
import { getDatabase, ref, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "../index.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { changeDisplayName } from "../utils/changeDisplayName";
import { changePassword } from "../utils/changePassword";
function ProfilePage() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const auth = getAuth();
      const database = getDatabase();

      await auth.signOut();

      if (auth.currentUser) {
        const cartRef = ref(database, `carts/${auth.currentUser.uid}`);

        await Promise.all([deleteUser(auth.currentUser), remove(cartRef)]);
      }

      setOpen(false);
      navigate("/");
    } catch (error) {
      alert("One or more deletions failed:", error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSaveDisplayName = async () => {
    await changeDisplayName(
      newDisplayName,
      setNewDisplayName,
      setSuccessMessage,
      setErrorMessage
    );
  };
  const handleDisplayNameChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const handleChangePassword = async () => {
    await changePassword(
      setCurrentPassword,
      setErrorMessage,
      setNewPassword,
      newPassword,
      setSuccessMessage,
      currentPassword
    );
  };
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    setNewPassword(e.target.value);
    setPasswordRequirements({
      length: e.target.value.length >= 8,
      lowercase: /[a-z]/.test(e.target.value),
      uppercase: /[A-Z]/.test(e.target.value),
      number: /\d/.test(e.target.value),
      special: /\W/.test(e.target.value),
    });
    setIsPasswordValid(passwordRegex.test(e.target.value));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
    <Card
      sx={{
        borderRadius: 6,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background:
          "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(249,248,248,1) 100%);",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        sx={{ backgroundColor: "#e9ecef", width: "100%", mb: 2 }}
      >
        <Tab label="Account Settings" />
      </Tabs>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
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
          >
            {errorMessage}
          </Alert>
        )}
        <Box
          sx={{
            width: "100%",
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ mt: 1, ml: 1 }}>
            Change Display Name :
          </Typography>
          <TextField
            label="New Display Name"
            variant="filled"
            value={newDisplayName}
            onChange={handleDisplayNameChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <br />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              className="btn-bg-color"
              onClick={handleSaveDisplayName}
              sx={{
                mt: 3,
              }}
            >
              Save
            </Button>
          </Box>
        </Box>{" "}
        <Box
          sx={{
            width: "100%",
            mb: 3,
          }}
        >
          <Typography variant="h6">Change Password :</Typography>
          <TextField
            label="Current Password"
            variant="filled"
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            fullWidth
            sx={{ mt: 2 }}
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
          <TextField
            label="New Password"
            variant="filled"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={handleNewPasswordChange}
            fullWidth
            sx={{ mt: 2 }}
            disabled={!currentPassword}
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
          {newPassword && passwordRequirementsList}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              className="btn-bg-color"
              onClick={handleChangePassword}
              sx={{
                mt: 2,
                ml: 2,
              }}
              disabled={!currentPassword || !isPasswordValid}
            >
              Change Password
            </Button>
          </Box>
        </Box>
        <Typography variant="h5">
          {" "}
          This action is irreversible and will permanently delete your account
          and all associated data. Are you sure you want to proceed?
        </Typography>
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete Account
        </Button>
      </Box>

      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete your account?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            className="btn-bg-color"
            variant="contained"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default ProfilePage;
