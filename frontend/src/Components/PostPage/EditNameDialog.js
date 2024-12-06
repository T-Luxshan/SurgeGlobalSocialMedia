import React from "react";
import { Dialog, DialogTitle, IconButton, Slide } from "@mui/material";
import Box from "@mui/material/Box";

import FormTextField from "../../Utils/Textfields";
import { FilledButton } from "../../Utils/Buttons";
import CancelIcon from "@mui/icons-material/Cancel";
import { updateUserName } from "../../Services/UserService";

const EditNameDialog = (props) => {
  const { open, handleClose, name, setName } = props;
  const [newName, setNewName] = React.useState(name);

  const handleChange = (e) => {
    setNewName(e.target.value);
    console.log(newName);
  };

  const handleSave = () => {
    setName(newName);
    updateUserName(newName)
    .then(res=>console.log("Done"))
    .catch(err=>console.log("Failed"));
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose}
        disableEnforceFocus
        disableRestoreFocus
        // keepMounted
        sx={{
          ".MuiDialog-paper": {
            width: "350px",
            borderRadius: "15px",
            px: "30px",
          },
        }}
      >
        <DialogTitle sx={{ mx: -2.5 }}>
          <Box
            sx={{
              // border: "1px solid blue",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {"Change Name"}
            <IconButton onClick={handleClose}>
              <CancelIcon sx={{ color: "primary.dark" }} />
            </IconButton>
          </Box>
        </DialogTitle>

        <Box sx={{}}>
          <FormTextField
            label={"new name"}
            sx={{ width: "100%" }}
            onChange={handleChange}
            value={newName}
            defaultValue={name}
          />
        </Box>
        <FilledButton
          disabled={!newName ? true : false}
          label={"Save"}
          sx={{
            width: "40px",
            mt: "15px",
            mb: "25px",
            backgroundColor: "primary.dark",
          }}
          onClick={handleSave}
        />
      </Dialog>
    </div>
  );
};

export default EditNameDialog;