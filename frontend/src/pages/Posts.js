import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { Container, Divider, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import PostCard from "../Components/PostPage/PostCard";
import ProfileSection from "../Components/PostPage/ProfileSection";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

// import posts from "../Data/Posts";
import { getAllPosts } from "../Services/PostService";
import { getUserDetails } from "../Services/UserService";

import UserContext from "../Contexts/UserContext";

const PostsPage = () => {
  const [posts, setPosts] = React.useState([]);
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    fetchAllPosts();
    fetchUserDetails();
  }, [name]);

  console.log("Posts", posts);
  const fetchAllPosts = async () => {
    try {
      const response = await getAllPosts();
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      document.cookie = `accessToken=; path=/;`;
      document.cookie = `refreshToken=; path=/;`;
      navigate("/");
    }
  };
  const fetchUserDetails = async () => {
    try {
      const response = await getUserDetails(); // Assuming you have a function to get user details
      setUser(response.data);
      setPreview(response.data.profileUri);
      setName(response.data.name);
      console.log("LEHHH", response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const email = user?.email;

  const handleLogOut = () => {
    document.cookie = `accessToken=; path=/;`;
    document.cookie = `refreshToken=; path=/;`;
    navigate("/");
    console.log("Logging out");
  };
  return (
    <div>
      <UserContext.Provider
        value={{
          user,
          email,
          setUser,
          preview,
          setPreview,
          name,
          setName,
        }}
      >
        <Container maxWidth={"xl"} sx={{}}>
          <Grid2 container>
            <Grid2 size={{ lg: 2.5, md: 2.5 }}>
              <Box sx={{ p: 2 }}>
                <Typography variant={"h4"} color={"primary.main"}>
                  Surge
                  <Typography variant={"body2"} component={"span"}>
                    {" "}
                    Global
                  </Typography>
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ lg: 7, md: 7 }} sx={{ boxShadow: 15 }}>
              <Box
                sx={{
                  overflowY: "scroll",
                  height: "100vh",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {posts.map((post) => (
                  <>
                    <PostCard key={post.postId} post={post} />
                    <Divider sx={{ mx: "20px" }} />
                  </>
                ))}
              </Box>
            </Grid2>
            <Grid2
              size={{ lg: 2.5, md: 2.5 }}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Stack
                spacing={2}
                direction={"column"}
                sx={{
                  height: "100%",
                  position: "relative",
                }}
              >
                <ProfileSection />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 0,
                  }}
                >
                  <Button
                    disableRipple
                    variant={"text"}
                    endIcon={<LogoutIcon />}
                    sx={{
                      textTransform: "inherit",
                      fontSize: "15px",
                      fontWeight: 600,
                      backgroundColor: "inherit",
                    }}
                    onClick={handleLogOut}
                  >
                    Log out
                  </Button>
                </Box>
              </Stack>
            </Grid2>
          </Grid2>
        </Container>
      </UserContext.Provider>
    </div>
  );
};

export default PostsPage;
