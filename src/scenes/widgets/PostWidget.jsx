import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  ThumbDown,
  ThumbDownOutlined,
  ThreeSixty,
  ThreeSixtyOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { Icon } from '@iconify/react';
import { Box, Divider, IconButton, Typography, useTheme, Tooltip, TextField, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import PostsWidget from "./PostsWidget";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setPost, setPosts, deletePost, setComment, setComments, SetCommentReply, setCommentsReply, setCommentContent, setReplyContent, setIsLikedComment, } from "state";
import { useEffect } from "react";

import { format } from "date-fns";
import '../../index.css';


const PostWidget = ({
  postId,
  postUserId,
  name,
  username,
  description,
  location,
  picturePath,
  videoPath,
  userPicturePath,
  likes,
  hates,
  boomerangs,
  comments,
  formattedTimestamp, // Updated prop name



}) => {
  const [isComments, setIsComments] = useState(false);
  const [isCommentsReply, setIsCommentsReply] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  // const isLiked = Boolean(likes[loggedInUserId]);
  // const likeCount = Object.keys(likes).length;
  const [isLikedPost, setIsLikedPost] = useState(Boolean(likes[loggedInUserId]));
  const [likeCountPost, setLikeCountPost] = useState(Object.keys(likes).length);
  // const isLikedComment = Boolean(likes[loggedInUserId]);
  // const likeCountComment = Object.keys(likes).length;
  const [isLikedComment, setIsLikedComment] = useState(false); // Initialize as needed
  const [likeCountComment, setLikeCountComment] = useState(0); // Initialize as needed

  const isHated = Boolean(hates[loggedInUserId]);
  const hateCount = Object.keys(hates).length;
  const isBoomeranged = Boolean(boomerangs[loggedInUserId]);
  const boomerangCount = Object.keys(boomerangs).length;

  const commentCount = Object.keys(comments).length;
  const [commentContent, setCommentContent] = useState("");
  const commentReplyCount = Object.keys(comments).length;
  const [replyContent, setReplyContent] = useState("");

  // Check if the logged-in user is the owner of the post
  const isOwnPost = postUserId === loggedInUserId;

  const [posts, setPosts] = useState([]);
  // const [commentLikes, setComment] = useState([]);


  const [message, setMessage] = useState(null);
  // const [isLikedComment, setIsLikedComment] = useState(Boolean(comments[loggedInUserId]?.likes));
  // const [likeCountComment, setLikeCountComment] = useState(Object.keys(comments[loggedInUserId]?.likes || {}).length);


  // ADD DELETE VIDEO POST
  const handleDeletePost = async () => {
    if (postId === undefined) {
      console.error("postId is undefined. Check how postId is passed to the component.");
      return;
    }

    try {
      const response = await fetch(`https://chirpskykite-server.onrender.com/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Delete post from UI or trigger a refresh of the posts
        // e.g., dispatch an action to update the posts state
        dispatch(deletePost(postId));
        setMessage('Post deleted successfully.');
        console.log('Post deleted successfully.');
        // After a successful delete, you can also remove the deleted post from the state
        setPosts(posts.filter((post) => post._id !== postId));
        fetchPosts(); // Refresh the list of posts after deletion
      } else {
        setMessage('Failed to delete the post.');
        console.log('Failed to delete the post.');
      }
    } catch (error) {
      setMessage('Error deleting the post: ' + error.message);
      console.error('Error deleting the post:', error);
    }
  };

  // FETCH VIDEO POSTS ALSO
  const fetchPosts = async () => {
    try {
      const response = await fetch("https://chirpskykite-server.onrender.com/posts");
      if (response.ok) {
        const updatedPosts = await response.json();
        setPosts(updatedPosts);
      } else {
        console.log("Failed to fetch posts.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };


  //   const fetchVideoPosts = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3001/posts/video");
  //     if (response.ok) {
  //       const updatedPosts = await response.json();
  //       setPosts(updatedPosts);
  //     } else {
  //       console.log("Failed to fetch posts.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //   }
  // };




  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  // POSTS LIKES
  // const patchLike = async () => {
  //   const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
  //     method: "PATCH",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ userId: loggedInUserId }),
  //   });
  //   const updatedPost = await response.json();
  //   dispatch(setPost({ post: updatedPost }));
  // };




  // const patchLikeComment = async (commentId) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/posts/${postId}/like-comment`, {
  //       method: "PATCH",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ userId: loggedInUserId, commentId }),
  //     });

  //     if (response.ok) {
  //       const updatedPost = await response.json();
  //       dispatch(setPost({ post: updatedPost }));
  //     } else {
  //       // Handle error, log or show user feedback
  //       console.error("Failed to like the comment.");
  //     }
  //   } catch (error) {
  //     // Handle error, log or show user feedback
  //     console.error("Error liking the comment:", error);
  //   }
  // };



  // Update patchLike to set likes for posts
  const patchLike = async () => {
    const response = await fetch(`https://chirpskykite-server.onrender.com/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    setIsLikedPost(!isLikedPost); // Toggle the like status
    setLikeCountPost(Object.keys(updatedPost.likes).length); // Update like count
    dispatch(setPost({ post: updatedPost }));

  };

  // Update patchLikeComment to set likes for comments
  const patchLikeComment = async (commentId) => {
    try {
      const response = await fetch(`https://chirpskykite-server.onrender.com/posts/${postId}/like-comment`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: loggedInUserId, commentId }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setIsLikedComment(!isLikedComment); // Toggle the like status
        setLikeCountComment(Object.keys(updatedPost.likes).length); // Update like count
      } else {
        // Handle error, log or show user feedback
        console.error("Failed to like the comment.");
      }
    } catch (error) {
      // Handle error, log or show user feedback
      console.error("Error liking the comment:", error);
    }
  };







  const patchHate = async () => {
    const response = await fetch(`https://chirpskykite-server.onrender.com/posts/${postId}/hate`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };


  const patchBoomerang = async () => {
    const response = await fetch(`https://chirpskykite-server.onrender.com/posts/${postId}/boomerang`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));


  };




  // COMMENTS
  const patchComment = async () => {
    if (commentContent.trim() === "") {
      // Comment is empty, handle the error or show a message to the user
      return;
    }

    const newComment = {
      userId: loggedInUserId,
      username: { username }, // Replace with the actual username
      commentText: commentContent,
      createdAt: new Date().toISOString(),

    };

    const response = await fetch(`https://chirpskykite-server.onrender.com/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUserId,
        commentText: commentContent,
      }),
    });

    const updatedPost = await response.json();
    console.log("Updated Post:", updatedPost);

    // Check if updatedPost.comments is an array before sorting
    const sortedComments = Array.isArray(updatedPost.comments)
      ? updatedPost.comments
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((comment) => ({
          ...comment,
          formattedTimestamp: comment.createdAt
            ? format(new Date(comment.createdAt), "MMM dd, yyyy HH:mm")
            : "",
        }))
      : [];

    // Ensure that the new comment is added to the sorted comments
    const updatedComments = [...sortedComments, newComment];

    // Update the post with sorted comments and reset comment input field
    dispatch(setPost({ post: { ...updatedPost, comments: updatedComments } }));
    setCommentContent("");
  };


  const handleCommentChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 187) {
      setCommentContent(inputValue);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    patchComment();
  };

  //----------------------------------------------------------------------------

  // COMMENT REPLY
  const patchCommentReply = async () => {
    if (replyContent.trim() === "") {
      // Comment is empty, handle the error or show a message to the user
      return;
    }

    const newCommentReply = {
      userId: loggedInUserId,
      username: { username }, // Replace with the actual username
      replyText: replyContent,
      createdAt: new Date().toISOString(),

    };

    const response = await fetch(`https://chirpskykite-server.onrender.com/posts/${postId}/comment-reply`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUserId,
        replyText: replyContent,
      }),
    });

    const updatedPost = await response.json();
    console.log("Updated Post:", updatedPost);

    // Check if updatedPost.comments is an array before sorting
    const sortedComments = Array.isArray(updatedPost.comments)
      ? updatedPost.comments
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((comment) => ({
          ...comment,
          formattedTimestamp: comment.createdAt
            ? format(new Date(comment.createdAt), "MMM dd, yyyy HH:mm")
            : "",
        }))
      : [];

    // Ensure that the new comment is added to the sorted comments
    const updatedComments = [...sortedComments, newCommentReply];

    // Update the post with sorted comments and reset comment input field
    dispatch(setPost({ post: { ...updatedPost, comments: updatedComments } }));
    setReplyContent("");
  };


  const handleCommentReplyChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 187) {
      setReplyContent(inputValue);
    }
  };

  const handleCommentReplySubmit = (e) => {
    e.preventDefault();
    patchCommentReply();
  };





  return (
    <div>
      {message && (
        <div
          className="message"
          style={{
            backgroundColor: "red",
            fontSize: "26px",
            color: "black",
            padding: "10px",
            border: "12px solid blue",
            borderRadius: "5px",
            margin: "10px 0",
          }}
        >
          {message}
        </div>
      )}


      <Box className="post-widget-container" m="2rem 0">
        <WidgetWrapper m="2rem 0">


          <Friend
            friendId={postUserId}
            name={name}
            username={username}
            subtitle={location}
            userPicturePath={userPicturePath}
            postId={postId}
          />



          <Typography color={main} sx={{
            mt: "1rem",
            width: "100%",
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            whiteSpace: "pre-wrap",  // Allow text wrapping
            wordWrap: "break-word",
            // Break words when necessary


          }}>
            {description}
          </Typography>



          {picturePath && (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={`https://chirpskykite-server.onrender.com/assets/${picturePath}`}
            />
          )}

          {videoPath && (
            <video
              width="100%"
              height="auto"
              alt="video not available!"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              controls
              autoplay
              muted
            >
              <source src={`https://chirpskykite-server.onrender.com/assets/${videoPath}`} />
              Your browser does not support the video format.
            </video>
          )}


          {/* Display the formatted timestamp */}
          <Typography color="red" sx={{ mt: "0.5rem", textAlign: "center" }}>
            {formattedTimestamp && <span>{formattedTimestamp}</span>}
          </Typography>
          <FlexBetween mt="0.25rem" gap="1rem">
            {/* Love */}
            <FlexBetween>
              <Tooltip title="Love">
                <IconButton onClick={patchLike}>
                  {isLikedPost ? (
                    <FavoriteOutlined sx={{ color: "red", "&:hover": { color: "#8a0303", cursor: "pointer" } }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </IconButton>
              </Tooltip>
              <Typography>{likeCountPost}</Typography>
            </FlexBetween>

            {/* Hate */}
            <FlexBetween>
              <Tooltip title="Hate">
                <IconButton onClick={patchHate}>
                  {isHated ? (
                    <ThumbDownOutlined sx={{ color: "brown", "&:hover": { color: "#77971b", cursor: "pointer" } }} />
                  ) : (
                    <ThumbDown />
                  )}
                </IconButton>
              </Tooltip>
              <Typography>{hateCount}</Typography>
            </FlexBetween>

            {/* Boomerang */}
            <FlexBetween>
              <Tooltip title="Boomerang">
                <IconButton onClick={patchBoomerang}>
                  {isBoomeranged ? (
                    <ThreeSixtyOutlined sx={{ color: primary, "&:hover": { color: "#0275F4" } }} />
                  ) : (
                    <ThreeSixty />
                  )}
                </IconButton>
              </Tooltip>
              <Typography>{boomerangCount}</Typography>
            </FlexBetween>
            {/* Speak Your Peace */}
            <FlexBetween>
              <Tooltip title="Speak Your Peace">
                <IconButton onClick={() => setIsComments(!isComments)}>
                  <ChatBubbleOutlineOutlined />
                </IconButton>
              </Tooltip>
              <Typography>{commentCount}</Typography>
            </FlexBetween>
          </FlexBetween>


          <Divider />
          <FlexBetween justifyContent="center" marginRight="3rem">
            <Tooltip title="Share">
              <IconButton>
                <ShareOutlined />
              </IconButton>
            </Tooltip>
          </FlexBetween>

          <Divider />
          <form onSubmit={handleCommentSubmit}>
            <TextField
              label="Leave a comment"
              variant="outlined"
              value={commentContent}
              onChange={handleCommentChange}
              fullWidth
              margin="dense"
              multiline
              maxRows={4}
              inputProps={{ maxLength: 187 }}
              width="100%"
              padding="1rem 2rem"
              whiteSpace="pre-wrap"  // Allow text wrapping
              wordWrap="break-word"
              size="small"
            />
            <Button variant="contained" color="primary" fontFamily="mortal kombat 4" type="submit"
              sx={{ "&:hover": { color: "#8a0303", backgroundColor: "skyblue" } }}
            >
              Chirp Comment
            </Button>
          </form>
          {isComments && (
            <Box mt="0.5rem" sx={{ maxHeight: "300px", overflowY: "auto" }}>
              {comments
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((comment, i) => (
                  <Box key={`${name}-${i}`}>
                    <Divider />

                    <FlexBetween>
                      <Typography sx={{ m: "0.5rem 0", pl: "1rem", maxWidth: "100%", wordWrap: "break-word" }}>
                        <Link to={`/profile/${comment.userId}`} style={{ textDecoration: "none", fontSize: "1.5rem" }}>
                          <Typography color="skyblue" sx={{ mt: "0.5rem", textAlign: "center" }}>
                            {comment.createdAt && (
                              <span>{format(new Date(comment.createdAt), "MMM dd, yyyy HH:mm")}</span>
                            )}
                          </Typography>
                          <strong>
                            <span style={{ color: "yourDesiredColor" }}>@</span>{comment.username}
                          </strong>

                        </Link> - {comment.commentText}
                      </Typography>
                    </FlexBetween>
                    <Divider />

                    <FlexBetween mt="0.25rem">
                      <FlexBetween gap="1rem">
                        <FlexBetween gap="0.3rem">
                          <Tooltip title="Love">
                            <IconButton onClick={() => patchLikeComment(comment._id)}>
                              {isLikedComment ? (
                                <FavoriteOutlined sx={{ color: "red", "&:hover": { color: "#8a0303", cursor: "pointer" } }} />
                              ) : (
                                <FavoriteBorderOutlined />
                              )}
                            </IconButton>


                          </Tooltip>
                          <Typography>{likeCountComment}</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.3rem">
                          <Tooltip title="Shit Head">
                            <Icon onClick={patchHate} className="shithead" icon="mdi:emoticon-poop" color="#964b00" hFlip={true} width="30" height="30"
                            />


                          </Tooltip>
                          {<Typography>{hateCount}</Typography>}
                        </FlexBetween>

                        <FlexBetween gap="0.3rem">
                          <Tooltip title="Boomerang">
                            <IconButton onClick={patchBoomerang}>
                              {isBoomeranged ? (
                                <ThreeSixtyOutlined sx={{ color: primary, "&:hover": { color: "#0275F4" } }} />
                              ) : (
                                <ThreeSixty />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Typography>{boomerangCount}</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.3rem">
                          <Tooltip title="WOW! Words Of Wisdom">
                            <IconButton onClick={() => setIsCommentsReply(prevState => !prevState)}>
                              <ChatBubbleOutlineOutlined />
                            </IconButton>
                          </Tooltip>
                          <Typography>{isCommentsReply}</Typography>
                        </FlexBetween>
                      </FlexBetween>


                      {/* COMMENT REPLY BOX */}
                      <Divider />






                    </FlexBetween>
                    <form onSubmit={handleCommentReplySubmit}>
                      <TextField
                        label="Speak Now Or Forever Hold Your Peace"
                        variant="outlined"
                        value={replyContent}
                        onChange={handleCommentReplyChange}
                        fullWidth
                        margin="dense"
                        multiline
                        maxRows={4}
                        inputProps={{ maxLength: 187 }}
                        width="100%"
                        padding="1rem 2rem"
                        whiteSpace="pre-wrap"  // Allow text wrapping
                        wordWrap="break-word"
                        size="small"
                      />

                      <Button
                        variant="contained"
                        color="primary"
                        fontFamily="mortal kombat"
                        type="submit"
                        sx={{
                          "&:hover": { color: "#8a0303", backgroundColor: "skyblue" },
                          float: "right", // This will move the button to the right
                        }}
                      >
                        Chirp Reply
                      </Button>



                    </form>


                  </Box>
                ))}

            </Box>
          )}
        </WidgetWrapper>
      </Box>
    </div>
  );
};

export default PostWidget;