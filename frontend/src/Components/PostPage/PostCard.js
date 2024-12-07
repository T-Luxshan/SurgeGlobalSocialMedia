import React, { useState, useContext, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Chip, IconButton, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { DateFormatter } from "../../Functions/DateFormatter";
import { extractUsername } from "../../Functions/UsernameExtract";
import { disLikePost, getPostById, likePost } from "../../Services/PostService";
import UserContext from "../../Contexts/UserContext";
import { getUserDetailsById } from "../../Services/UserService";

const PostCard = ({ post }) => {
  const { email } = useContext(UserContext);
  const [likeList, setLikeList] = React.useState([]);
  const [autherProfile, setAutherProfile] = React.useState(null);

  const [likeCount, setLikeCount] = useState(likeList.length);

  const postTime = post.dateCreated;
  const formattedDate = DateFormatter(postTime);
  const username = extractUsername(post.author);

  const liked = useMemo(() => {
    const isLiked = likeList.includes(email);
    console.log("LIKE?:", isLiked); // Correct value here
    return isLiked;
  }, [likeList, email]);

  console.log("like", liked);
  useEffect(() => {
    fetchPost(post.postId);
    fetchUserById(post.author);
  }, [liked]);

  const fetchPost = async (id) => {
    try {
      const response = await getPostById(id);
      setLikeCount(response.data.likeList.length);
      setLikeList(response.data.likeList);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  const fetchUserById = async (email) => {
    try {
      const response = await getUserDetailsById(email);
      setAutherProfile(response.data.profileUri);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleLike = (id) => {
    const isCurrentlyLiked = liked;

    setLikeList((prevLikeList) => {
      if (isCurrentlyLiked) {
        return prevLikeList.filter((email) => email !== email);
      } else {
        return [...prevLikeList, email];
      }
    });

    if (isCurrentlyLiked) {
      disLike(id);
    } else {
      addLike(id);
    }
  };

  const addLike = (id) => {
    likePost(id)
      .then((res) => console.log("Liked"))
      .catch((e) => console.log("not Liked"));
  };

  const disLike = (id) => {
    disLikePost(id)
      .then((res) => console.log("Liked"))
      .catch((e) => console.log("not Liked"));
  };

  return (
    <div>
      <Box sx={{ p: "20px" }}>
        <Stack direction={"column"} spacing={1}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Avatar
              sx={{ width: "32px", height: "32px" }}
              src={autherProfile}
            />
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
          <Stack
            direction={"row"}
            spacing={-0.5}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <IconButton
              disableFocusRipple
              disableRipple
              onClick={() => handleLike(post.postId)}
              sx={{ backgroundColor: "inherit" }}
            >
              {liked ? (
                <FavoriteIcon color={"error"} sx={{ fontSize: "20px" }} />
              ) : (
                <FavoriteBorderIcon color={"error"} sx={{ fontSize: "20px" }} />
              )}
            </IconButton>
            <Typography variant={"caption"} fontWeight={600} color="black">
              {likeCount} {likeCount !== 1 ? "likes" : "like"}
            </Typography>

            {/*<Chip*/}
            {/*  onClick={() => handleLike(post.postId)}*/}
            {/*  label={likeCount}*/}
            {/*  icon={*/}
            {/*    liked ? (*/}
            {/*      <FavoriteIcon color={"error"} sx={{ fontSize: "20px" }} />*/}
            {/*    ) : (*/}
            {/*      <FavoriteBorderIcon sx={{ fontSize: "20px" }} />*/}
            {/*    )*/}
            {/*  }*/}
            {/*  sx={{*/}
            {/*    px: "3px",*/}
            {/*    color: liked ? "error.main" : "",*/}
            {/*  }}*/}
            {/*/>*/}
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default PostCard;
