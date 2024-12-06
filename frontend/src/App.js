import React, { createContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PostsPage from "./pages/Posts";
import theme from "./ColorTheme";
import VerifyOTP from "./pages/VerifyOTP";
import ForgotPassword from "./pages/ForgotPassword";
import { EmailProvider } from "./Services/EmailContext";
import ChangePassword from "./pages/ChangePassword";

// export const ThemeContext = createContext(null);

function App() {
  // const [theme, setTheme] = useState("light");
  //
  // const toggleTheme = () => {
  //   setTheme((curr) => (curr === "light" ? "dark" : "light"));
  // };

  return (
    <ThemeProvider theme={theme}>
      <div className="App" id={theme}>
        <Router>
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  <SignUp />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Login />
                </>
              }
            />
            <Route
              path="/post"
              element={
                <>
                  <PostsPage />
                </>
              }
            />
            <Route
              path="/forgotpassword"
              element={
                <EmailProvider>
                  <ForgotPassword />
                </EmailProvider>
              }
            />
            <Route
              path="/verifyotp"
              element={
                <EmailProvider>
                  <VerifyOTP />
                </EmailProvider>
              }
            />
            <Route
              path="/changepassword"
              element={
                <EmailProvider>
                  <ChangePassword />
                </EmailProvider>
              }
            />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
