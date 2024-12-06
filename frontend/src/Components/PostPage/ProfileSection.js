import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Badge, IconButton, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FilledButton } from "../../Utils/Buttons";

import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";

// import user from "../../Data/User";
import AddPostDialog from "./AddPostDialog";
import EditNameDialog from "./EditNameDialog";

import { extractUsername } from "../../Functions/UsernameExtract";
import { getUserDetails } from "../../Services/UserService";

const ProfileSection = () => {
  const [openPostDialog, setOpenPostDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const [user, setUser] = React.useState(null);
  const [name, setName] = React.useState("");
  const [ProfilePhoto, setProfilePhoto] = React.useState("");
  // const username = extractUsername(user.email);


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

  React.useEffect(()=>{
    fetchUserDetails();
  }, [])

  const fetchUserDetails = async () => {
    try {
      const response = await getUserDetails();
      console.log(response); 
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error); 
    }
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          // alignItems: "center",
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
              >
                <EditIcon sx={{ fontSize: "14px", color: "primary.main" }} />
              </IconButton>
            }
          >
            <Avatar
              alt="Profile Image"
              src={
                user?.profileUrl
                  ? user.profileUrl
                  : "https://preview.redd.it/e54iveeo62c91.png?width=640&crop=smart&auto=webp&s=5f7e962b44b363aabfbca4b6a768ac84dab10101"
              }
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
            <Typography
              variant={"h5"}
              fontWeight={600}
              textAlign={"center"}
              sx={{
                // border: "1px solid red",
                display: "flex",
                alignItems: "center",
              }}
            >
              {user?.name || "Loading..."}
            </Typography>
            <Typography
              sx={{
                // border: "1px solid red",
                display: "flex",
                alignItems: "center",
              }}
              variant={"subtitle2"}
            >
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
      <AddPostDialog
        open={openPostDialog}
        handleClose={handleClosePostDialog}
      />
      <EditNameDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
      />
    </div>
  );
};

export default ProfileSection;
