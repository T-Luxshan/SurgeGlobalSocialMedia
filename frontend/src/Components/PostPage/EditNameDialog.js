import React from "react";
import { Dialog, DialogTitle, IconButton, Slide } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FormTextField from "../../Utils/Textfields";
import { FilledButton } from "../../Utils/Buttons";
import transparantBackground from "../../Assets/transparant.png";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const EditNameDialog = ({ open, handleClose }) => {
  const [image, setImage] = React.useState(
    "https://surge.global/wp-content/uploads/2024/11/Surge-Featured-Image.png",
    // null,
  );
  const [name, setName] = React.useState("");

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
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
        <DialogTitle sx={{ ml: -2.5 }}>{"Change Your Name"}</DialogTitle>
        {/*<DialogContent sx={{ mt: 3, pt: 3 }}>*/}
        <Box sx={{}}>
          <FormTextField label={"new name"} sx={{ width: "100%" }} />
        </Box>
        <FilledButton
          label={"Save"}
          sx={{ width: "40px", mt: "15px", mb: "25px" }}
        />
        {/*</DialogContent>*/}
      </Dialog>
    </div>
  );
};

export default EditNameDialog;
