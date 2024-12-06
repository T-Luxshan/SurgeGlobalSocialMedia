import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

export const FilledButton = ({ ...props }) => (
  <Button
    disableElevation
    endIcon={props.endIcon}
    onClick={props.onClick}
    variant={"contained"}
    sx={{
      borderRadius: "13px",
      textTransform: "capitalize",
      fontSize: "14px",
      ...props.sx,
    }}
  >
    {props.label}
  </Button>
);
