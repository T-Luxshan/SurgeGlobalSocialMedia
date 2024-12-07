import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Badge, IconButton, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FilledButton } from "../../Utils/Buttons";
import { storage } from "../../Config/firebase.config";
import {
  getDownloadURL,
  uploadBytes,
  ref,
  deleteObject,
} from "firebase/storage";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AvatarEdit from "react-avatar-edit"; // Assuming this component is used to edit the avatar
import { getUserDetails } from "../../Services/UserService";
import { addProfilePhoto, deletePhoto } from "../../Services/ProfileService";
import { extractUsername } from "../../Functions/UsernameExtract";
import AddPostDialog from "./AddPostDialog";
import EditNameDialog from "./EditNameDialog";
import userContext from "../../Contexts/UserContext";
import UserContext from "../../Contexts/UserContext";

const ProfileSection = () => {
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [open, setOpen] = useState(false);
  // const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [preview, setPreview] = useState(null);
  // const [user, setUser] = useState(null);
  const [profile, setProfile] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { user, setName, preview, setPreview } = useContext(UserContext);
  console.log("Profile", user);
  const profileUri = user?.profileUri;
  console.log("ProfileURL", profileUri);
  // useEffect(() => {
  //   fetchUserDetails();
  // }, []);

  const handleOpenPostDialog = () => {
    setOpenPostDialog(true);
  };

  const handleClosePostDialog = () => {
    setOpenPostDialog(false);
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  // const username = extractUsername(user?.email);

  // const fetchUserDetails = async () => {
  //   try {
  //     const response = await getUserDetails(); // Assuming you have a function to get user details
  //     setUser(response.data);
  //     setPreview(response.data.profileUri);
  //     setName(response.data.name);
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //   }
  // };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile)); // Generate a preview URL
    }
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleUpload = () => {
    setIsLoading(true);
    if (preview) {
      handleDelete(); // Delete the existing profile photo first if any
    }

    if (preview) {
      const blob = dataURLtoBlob(preview);
      const imgRef = ref(storage, `ProfilePhoto/profile-${Date.now()}.png`);

      uploadBytes(imgRef, blob)
        .then(() => {
          return getDownloadURL(imgRef);
        })
        .then((url) => {
          setPreview(url); // Update profile URL state
          saveToDB(url); // Save to database
          setIsLoading(false);
          handleClose();
          console.error("uploading profile:", url);
        })
        .catch((error) => {
          console.error("Error uploading profile:", error);
          setIsLoading(false); // Ensure to stop the spinner if there's an error
        });
    } else {
      setIsLoading(false); // Stop the spinner if no preview is provided
      handleClose(); // Close the dialog if no image is uploaded
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const deleteRef = ref(storage, preview);
    try {
      deleteObject(deleteRef).then(() => {
        // onProfileChange(null);
        setInterval(() => {
          setIsLoading(false);
        }, 2000);
      });
      deleteFromDB();
      setPreview(null);
      // setProfile(null);
    } catch (error) {
      setIsLoading(true);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    }
    setOpen(false);
  };
  // Save to Database
  const saveToDB = (preview) => {
    addProfilePhoto(preview)
      .then((res) => console.log("Profile saved to DB"))
      .catch((err) => console.log("Faild to save to db"));
  };

  //Delete from Database.
  const deleteFromDB = () => {
    deletePhoto()
      .then((res) => console.log("Profile deleted from DB"))
      .catch((err) => console.log("Faild to delete from db"));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCrop = (view) => {
    setPreview(view);
  };

  const onCloseAvatar = () => {
    // setPreview(null);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: "20px",
        }}
      >
        <Stack
          spacing={1}
          direction="column"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <IconButton
                sx={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "4px",
                  boxShadow: 2,
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
                onClick={handleClickOpen}
              >
                <EditIcon sx={{ fontSize: "14px", color: "primary.main" }} />
              </IconButton>
            }
          >
            <Avatar
              alt="Profile Image"
              src={preview} // Add a default profile image
              sx={{
                height: "100px",
                width: "100px",
                border: "2.5px solid",
                borderColor: "primary.light",
              }}
            />
          </Badge>
          <Stack
            spacing={0}
            direction="column"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant={"h5"} fontWeight={600} textAlign={"center"}>
              {user?.name || "Loading..."}
            </Typography>
            <Typography variant={"subtitle2"}>
              {user?.email || "Loading..."}
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <FilledButton
              endIcon={
                <AddBoxIcon fontSize={"10px"} sx={{ fontSize: "10px" }} />
              }
              label="New Post"
              onClick={handleOpenPostDialog}
            />
            <FilledButton
              endIcon={<EditIcon fontSize={"10px"} sx={{ fontSize: "10px" }} />}
              label="Edit Profile"
              onClick={handleOpenEditDialog}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Hidden file input to allow users to select an image */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
        id="upload-avatar-input"
      />

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <Box display="flex" justifyContent="center" gap={5}>
          <DialogTitle>Update profile photo</DialogTitle>
          <IconButton aria-label="edit" onClick={handleClose}>
            <CancelIcon color="error" />
          </IconButton>
        </Box>
        <DialogContent sx={{ width: "300px", height: "350px" }}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", m: "100px" }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <AvatarEdit
              width={300}
              height={300}
              onCrop={onCrop}
              onClose={onCloseAvatar}
            />
          )}
          <Box display="flex" justifyContent="center" gap={10}>
            <Button onClick={handleUpload}>Update</Button>
            {preview && (
              <Button color="error" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>
      <AddPostDialog
        open={openPostDialog}
        handleClose={handleClosePostDialog}
      />
      <EditNameDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        name={user?.name}
        setName={setName}
      />
    </div>
  );
};

export default ProfileSection;
