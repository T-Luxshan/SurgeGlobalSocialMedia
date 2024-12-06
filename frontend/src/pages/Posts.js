import React, { useContext } from "react";
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



const PostsPage = () => {

  const [posts, setPosts] = React.useState([]);
  const navigate = useNavigate();



  React.useEffect(()=>{
    fetchAllPosts();
  }, [])



  const fetchAllPosts = async () => {
    try {
      const response = await getAllPosts(); // Assuming you have a function to get user details
      // setUser(response.data);
      // setPreview(response.data.profileUri);
      // setName(response.data.name);
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  
  const arr = [0, 1, 2, 3];
  console.log("lucky",posts);

  const handleLogOut = () => {
    document.cookie = `accessToken=; path=/;`;
    document.cookie = `refreshToken=; path=/;`;
    navigate("/")
    console.log("Logging out");
  };
  return (
    <div>
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
          <Grid2 size={{ lg: 7, md: 7 }}>
            <Box
              sx={{
                overflowY: "scroll",
                height: "100vh",
              }}
            >
              {posts.map((post) => (
                <>
                  <PostCard key={post.id} post={post} />
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
    </div>
  );
};

export default PostsPage;
