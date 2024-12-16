import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import OTPInput from "otp-input-react";
import { useEmailContext } from "../Services/EmailContext";
import { sendOTP, verifyOTP } from "../Services/AuthService";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("This is not a valid email")
    .required("Email is required"),
});

const VerifyOTP = () => {
  const { email } = useEmailContext();
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  React.useEffect(() => {
    if (!email) {
      navigate("/"); 
    }
  }, [email, navigate]);

  const handleOTP = async () => {
    console.log(email);
    verifyOTP(OTP, email)
      .then((res) => {
        console.log(res);
        navigate("/changepassword");
      })
      .catch((err) => {
        console.log(error);
        setError("OTP verification failed");
      });
  };

  const resendOTP = () => {
    sendOTP(email)
      .then(console.log("OTP resend"))
      .catch((err) => console.log("OTP resend failed.", err));
  };

  return (
    <Grid2 container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid2
        size={{ xs: false, sm: 4, md: 6 }}
        sx={{
          backgroundImage: `url(${require("../Assets/EnterOTP.png")})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[0]
              : t.palette.grey[900],
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />
      <Grid2
        size={{ xs: 12, sm: 8, md: 4 }}
        component={Paper}
        elevation={2}
        square
        sx={{ height: "60vh", mt: "120px", ml: 10 }}
      >
        <Box
          sx={{
            my: 8,
            mx: 10,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <Typography
            component="h5"
            variant="h5"
            align="left"
            sx={{ mb: 5, fontWeight: "bold" }}
          >
            Enter the OTP
          </Typography>
          <Box sx={{ alignItems: "center" }}>
            <Box sx={{ ml: 3 }}>
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={6}
                otpType="number"
                disabled={false}
                secure
              />
              {error && (
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ m: 1, color: "red" }}
                >
                  {error}
                </Typography>
              )}
            </Box>
            <Button
              variant="contained"
              onClick={handleOTP}
              sx={{ mt: 5, boxShadow: "none", color: "white", width: "100%" }}
            >
              Verify OTP
            </Button>
            <Box
              sx={{
                mt: 0,
                ml: 7,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ mr: 0, lineHeight: 1 }}
              >
                Didn't receive OTP?
              </Typography>
              <Button
                variant="text"
                onClick={resendOTP}
                sx={{
                  fontSize: 13,
                  textTransform: "none",
                  pb: 2,
                  mt: 1,
                  mr: 10,
                }}
              >
                Resend
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default VerifyOTP;
