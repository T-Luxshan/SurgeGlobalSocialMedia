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
import { login } from "../Services/AuthService";
import { GetCookie } from "../Functions/GetCookie";


const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#E91C26",
    },
    secondary: {
      main: "#EAE9E7",
    },
  },
});

const Login = () => {
  const [logError, setLogError] = useState("");
  const [emailError, setEmailError] = useState(""); // For email validation
  const [passwordError, setPasswordError] = useState(""); // For password validation
  const [capVal, setCapVal] = useState(null);
  const [capError, setCapError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    let valid = true;

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
      console.log({ email, password });
      login(email, password)
        .then((res) => {
          console.log(res.data);
          setLogError("");
          //  token handiling and navigation.
          document.cookie = `accessToken=${res.data.accessToken}; path=/;`;
          document.cookie = `refreshToken=${res.data.refreshToken}; path=/;`;
        })
        .catch((e) => {
          console.log("Login failed");
          setLogError("Invalid login, please try again");
        });

      

      
    }
  };

  return (
      <Grid2
        container
        component="main"
        sx={{ height: "100vh", backgroundColor: "#F5F5F5" }}
      >
        <CssBaseline />

        {/* Left Panel */}
        <Grid2
          size={{ xs: "false", sm: 4, md: 6 }}
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

        <Grid2
          size={{ xs: 12, sm: 8, md: 5 }}
          component={Paper}
          elevation={2}
          square
          sx={{ minHeight: "300px", mt: "10px", mb: "10px" }}
        >
          <Box
            sx={{
              my: 5,
              mx: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(emailError)}
                helperText={emailError} // Show validation message
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
                helperText={passwordError} // Show validation message
              />

              <ReCAPTCHA
                sitekey={process.env.REACT_APP_SITE_KEY}
                onChange={(val) => setCapVal(val)}
              ></ReCAPTCHA>
              {capError && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {capError}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1, color: "white" }}
              >
                Sign In
              </Button>

              <Grid2
                container
                sx={{ justifyContent: "space-between" }} // Distributes space between the items
              >
                <Grid2 item>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid2>
                <Grid2 item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid2>
              </Grid2>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
  );
};

export default Login;
