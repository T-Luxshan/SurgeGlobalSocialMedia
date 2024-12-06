import React from "react";
import { Dialog, DialogTitle, IconButton, Slide } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FormTextField from "../../Utils/Textfields";
import { FilledButton } from "../../Utils/Buttons";
import transparantBackground from "../../Assets/transparant.png";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const AddPostDialog = ({ open, handleClose }) => {
  const [image, setImage] = React.useState(
    // "https://surge.global/wp-content/uploads/2024/11/Surge-Featured-Image.png",
    null,
  );

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
            // minHeight: "460px",
            // minWidth: "550px",
            borderRadius: "15px",
            px: "30px",
          },
        }}
      >
        <DialogTitle sx={{ ml: -2.5 }}>{"Add your new post"}</DialogTitle>
        {/*<DialogContent sx={{ mt: 3, pt: 3 }}>*/}
        <Box sx={{}}>
          <FormTextField label={"caption"} sx={{ width: "100%" }} />

          <Box
            sx={{
              height: "240px",
              width: "380px",
              // border: "1px solid red",
              borderRadius: "15px",
              mt: "20px",
              backgroundColor: "#D0D0D0",
              backgroundImage: !image
                ? `url(${transparantBackground})`
                : `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/*<FilledButton*/}
            {/*  label={"Add Image"}*/}
            {/*  sx={{ backgroundColor: "#D0D0D0" }}*/}
            {/*/>*/}
            {!image ? (
              <IconButton
                disableRipple
                sx={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "4px",
                  boxShadow: 2,
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <AddPhotoAlternateIcon sx={{ color: "#D0D0D0" }} />
              </IconButton>
            ) : (
              <></>
            )}
          </Box>

          {image ? (
            <Button
              disableRipple
              variant={"text"}
              sx={{
                textTransform: "lowercase",
                ":hover": { backgroundColor: "inherit", color: "primary.dark" },
              }}
            >
              change image
            </Button>
          ) : (
            <></>
          )}
        </Box>
        <FilledButton
          label={"Post"}
          sx={{ width: "40px", mt: "15px", mb: "25px" }}
        />
        {/*</DialogContent>*/}
      </Dialog>
    </div>
  );
};

export default AddPostDialog;
