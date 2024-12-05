import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid2 from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { register } from "../Services/AuthService";

const SignUp = () => {
  const [logError, setLogError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [capVal, setCapVal] = useState(null);
  const [capError, setCapError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    let fullName = data.get("fullName"); // Get the full name from the form
    let email = data.get("email");
    let password = data.get("password");

    let valid = true;

    // Full Name Validation
    if (!fullName) {
      setNameError("Full name is required");
      valid = false;
    } else if (!/^[a-zA-Z\s'-]+$/.test(fullName)) {
      setNameError("Enter a valid full name");
      valid = false;
    } else if (fullName.length < 2 || fullName.length > 50) {
      setNameError("Full name must be between 2 and 50 characters");
      valid = false;
    } else {
      setNameError("");
    }

    // Email Validation
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password Validation
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
      valid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setPasswordError(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    // reCAPTCHA Validation
    if (!capVal) {
      setCapError("Please check the reCAPTCHA");
      valid = false;
    } else {
      setCapError("");
    }

    if (valid) {
      console.log({ fullName, email, password });

      // Connect with backend
      email = email.toLowerCase();
      register(fullName, email, password)
        .then((res) => {
          console.log(res.data);
          // Set the token in cookie (example)

          document.cookie = `accessToken=${res.data.accessToken}; path=/;`;
          document.cookie = `refreshToken=${res.data.refreshToken}; path=/;`;
          // TODO: token handle and navigate.
        })
        .catch((e) => {
          console.log("Registration failed.");
          setLogError("Invalid Sign up, please try again");
        });
    }
  };

  return (
    <div>
      <Grid2
        container
        component="main"
        sx={{ minHeight: "100vh", backgroundColor: "#F5F5F5" }}
      >
        <CssBaseline />

        {/* Left Panel */}
        <Grid2
          xs={false}
          size={{ sm: 4, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5F5F5",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              component="div"
              color="black"
              sx={{ fontWeight: "bold", textAlign: "left" }}
            >
              Surge SE Internship
            </Typography>
            <Typography
              variant="h5"
              component="div"
              color="black"
              sx={{ textAlign: "left", mt: 1 }}
            >
              January 2025
            </Typography>
            <Typography
              variant="h4"
              component="div"
              color="black"
              sx={{ fontWeight: "bold", textAlign: "left", mt: 5 }}
            >
              Luxshan Thuraisingam
            </Typography>
          </Box>
        </Grid2>

        {/* Right Panel */}
        <Grid2
          size={{ sm: 8, md: 5, xs: 12 }}
          component={Paper}
          elevation={2}
          square
          sx={{
            minHeight: "650px",
            my: "100px",
            px: 8,
            // mb: "50px",
            // border: '1px solid red',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              // my: 5,
              mt: "-140px",
              // mx: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              maxHeight: "450px",
              // border: '1px solid blue',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {logError && (
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color={"primary.darker"}
                  backgroundColor={"primary.lighter"}
                  sx={{
                    mt: 0,
                    mb: 0,
                    pt: 1,
                    pr: 2,
                    pb: 1,
                    pl: 2,
                    borderRadius: 1,
                  }}
                >
                  {logError}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="name"
                autoFocus
                error={Boolean(nameError)}
                helperText={nameError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={Boolean(emailError)}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={Boolean(passwordError)}
                helperText={passwordError}
              />
              <Box sx={{ mt: 1, mb: 2 }}>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_SITE_KEY}
                  onChange={(val) => setCapVal(val)}
                ></ReCAPTCHA>
              </Box>
              {capError && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {capError}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1, color: "white" }}
              >
                Sign Up
              </Button>
              <Grid2 container>
                <Grid2
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    mt: 1, // Top margin for spacing
                    textAlign: "center", // Center-align the tex
                    width: "100%",
                  }}
                >
                  <Box sx={{}}>
                    <Link href="/login" variant="body2">
                      {"Already have an account? Log in"}
                    </Link>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default SignUp;
