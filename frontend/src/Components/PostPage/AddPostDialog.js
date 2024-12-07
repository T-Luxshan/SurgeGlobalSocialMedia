import React from "react";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FormTextField from "../../Utils/Textfields";
import { FilledButton } from "../../Utils/Buttons";
import transparantBackground from "../../Assets/transparant.png";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";
import { storage } from "../../Config/firebase.config";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { createPost } from "../../Services/PostService";

const AddPostDialog = (props) => {
  const { open, handleClose } = props;
  const [newCaption, setNewCaption] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageFile, setImageFile] = React.useState(null); 
  const [imagePreview, setImagePreview] = React.useState(null); 

  // Handle caption input change
  const handleChange = (e) => {
    setNewCaption(e.target.value);
  };

  const handlePostChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile); 
      setImagePreview(URL.createObjectURL(selectedFile)); 
    }
  };

  const handleUpload = () => {
    if (!imageFile || !newCaption) {
      alert("Please add an image and a caption.");
      return;
    }

    setIsLoading(true);

    
    const imgRef = ref(storage, `post/post-${Date.now()}-${imageFile.name}`);

    // Upload the file
    uploadBytes(imgRef, imageFile)
      .then(() => getDownloadURL(imgRef)) // Get the download URL
      .then((url) => {
        console.log("File uploaded successfully! URL:", url);
        createPost(url, newCaption)
        .then(res=>{
          alert("post created");
        })
        .catch(err=>console.log("Failed"));
      })
      .catch((error) => {
        console.log("Error uploading file:", error);
        setIsLoading(false);
      });
      setIsLoading(false);
      setNewCaption("");
      setImageFile(null);
      setImagePreview(null);
      handleClose(); // Close the dialog

  };

  return (
    <div>
      <Dialog
        open={open}
        disableEnforceFocus
        disableRestoreFocus
        sx={{
          ".MuiDialog-paper": {
            borderRadius: "15px",
            px: "30px",
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Add your new post
            <IconButton onClick={handleClose}>
              <CancelIcon sx={{ color: "primary.dark" }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <Box>
          {/* Caption Input */}
          <FormTextField
            label="Caption"
            sx={{ width: "100%" }}
            value={newCaption}
            onChange={handleChange}
          />

          {/* Image Preview */}
          <Box
            sx={{
              height: "240px",
              width: "380px",
              borderRadius: "15px",
              mt: "20px",
              backgroundColor: "#D0D0D0",
              backgroundImage: !imagePreview
                ? `url(${transparantBackground})`
                : `url(${imagePreview})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!imagePreview ? (
              <IconButton
                disableRipple
                sx={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "4px",
                  boxShadow: 2,
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
                onClick={() =>
                  document.getElementById("upload-post-input").click()
                } 
              >
                <AddPhotoAlternateIcon sx={{ color: "#D0D0D0" }} />
              </IconButton>
            ) : null}
          </Box>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePostChange}
            id="upload-post-input"
          />

          {imagePreview ? (
            <Button
              disableRipple
              variant="text"
              sx={{
                textTransform: "lowercase",
                ":hover": { backgroundColor: "inherit", color: "primary.dark" },
              }}
              onClick={() => document.getElementById("upload-post-input").click()} 
            >
              Change image
            </Button>
          ) : null}
        </Box>

        {/* Post Button */}
        <FilledButton
          disabled={!newCaption || !imageFile || isLoading}
          label={isLoading ? "Posting..." : "Post"}
          sx={{
            width: "40px",
            mt: "15px",
            mb: "25px",
            backgroundColor: "primary.dark",
          }}
          onClick={handleUpload}
        />
      </Dialog>
    </div>
  );
};

export default AddPostDialog;
