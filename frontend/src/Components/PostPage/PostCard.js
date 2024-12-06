import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Chip, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { DateFormatter } from "../../Functions/DateFormatter";
import { extractUsername } from "../../Functions/UsernameExtract";
import user from "../../Data/User";
import { disLikePost, likePost } from "../../Services/PostService";

const PostCard = ({ post }) => {
  // console.log("pooo", post);
  const isUsernameInLikesList = (email, likesList) => {
    // setLikeCount(likesList.includes(email));
    return likesList.includes(email);
  };

  const [liked, setLiked] = useState(
    isUsernameInLikesList(user.email, post.likeList),
  );
  const [likeCount, setLikeCount] = useState(post.likeList.length);
  const handleLike = (id) => {
    setLiked(!liked);
    // liked ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
    liked ?  disLike(id) : addLike(id);
  };

  const addLike = (id) => {
    likePost(id)
    .then(res=>console.log("Liked"))
    .catch(e=>console.log("not Liked"))
  }

  const disLike = (id) => {
    disLikePost(id)
    .then(res=>console.log("Liked"))
    .catch(e=>console.log("not Liked"))
  }

  const postTime = post.dateCreated;
  const formattedDate = DateFormatter(postTime);
  const username = extractUsername(post.author);
  console.log(`Date, ${DateFormatter(postTime)}`);
  return (
    <div>
      <Box sx={{ p: "20px" }}>
        <Stack direction={"column"} spacing={1}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Avatar sx={{ width: "32px", height: "32px" }} />
            <Stack direction={"column"} spacing={-0.6}>
              <Typography variant={"body1"}> {username}</Typography>
              <Typography variant={"caption"}>{formattedDate}</Typography>
            </Stack>
          </Stack>
          <Typography variant={"subtitle2"} fontWeight={500}>
            {post.caption}
          </Typography>
          <Box
            sx={{
              height: "450px",
              borderRadius: "20px",
              backgroundImage: `url(${post.photo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>
          <Stack direction={"row"} spacing={1}>
            <Chip
              label={likeCount}
              onClick={handleLike}
              icon={
                liked ? (
                  <FavoriteIcon color={"error"} sx={{ fontSize: "20px" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: "20px" }} />
                )
              }
              sx={{
                px: "3px",
                // backgroundColor: liked ? "error.lighter" : "",
                color: liked ? "error.main" : "",
              }}
            />
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default PostCard;
