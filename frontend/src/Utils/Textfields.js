import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const FormTextField = ({ label, textFieldProps, sx = {}, ...props }) => {
  return (
    <Box
      sx={{
        alignItems: "center",
        width: "100%",
        ...sx,
        // border: "1px solid green",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TextField
        id={label.toLowerCase().replace(/\s+/g, "-")}
        label={label}
        name={props.name}
        variant="standard"
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        sx={{
          width: "100%",
          fontSize: "50px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            borderWidth: "1.5px",
            "& fieldset": {
              borderWidth: "1.5px",
              borderColor: "primary.light",
            },
            "&:hover fieldset": {
              borderWidth: "1.5px",
              borderColor: "prmary.main",
            },
            "&.Mui-focused fieldset": {
              borderWidth: "1.5px",
              borderColor: "prmary.main",
            },
          },
          "& .MuiInputLabel-root": {
            color: "primary.lighter",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "primary.main",
            fontWeight: "bold",
            fontSize: "12px",
          },
        }}
        {...textFieldProps}
      />
    </Box>
  );
};

export default FormTextField;
