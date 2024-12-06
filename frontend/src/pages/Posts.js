import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { Container, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import PostCard from "../Components/PostPage/PostCard";
import ProfileSection from "../Components/PostPage/ProfileSection";

import posts from "../Data/Posts";

const PostsPage = () => {
  const arr = [0, 1, 2, 3];
  console.log(posts);
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
          <Grid2 size={{ lg: 2.5, md: 2.5 }}>
            <Box sx={{}}>
              <ProfileSection />
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
};

export default PostsPage;
