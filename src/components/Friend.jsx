import { PersonAddOutlined, PersonRemoveOutlined, DeleteOutline } from "@mui/icons-material";
import { Box, IconButton, Snackbar, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, deletePost, showSnackbar } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import React, { useState } from "react";
import MuiAlert from '@mui/material/Alert';
import state, { closeSnackbar } from "state";
import "index.css";


const vertical = "bottom";
const horizontal = "center";



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const Friend = ({ friendId, name, username, subtitle, userPicturePath, postId }) => {
  // const { open, message, severity } = useSelector((state) => state.snackbar);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  

  // console.log("Friend data:", { friendId, name, username, subtitle, userPicturePath, postId });


  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // const handleCloseSnackbar = () => {
  //   setMessage(null);
  // };

   // Perform null or undefined checks
  //  if (
  //   friendId === undefined ||
  //   name === undefined ||
  //   username === undefined ||
  //   userPicturePath === undefined ||
  //   postId === undefined
  // ) {
  //   // Handle the case when any of the essential properties is null or undefined
  //   return <div>Error: Friend data is missing</div>;
  // }


  // console.log("Before null checks:", { friendId, name, username, subtitle, userPicturePath, postId });
  //  if (!friendId || !name || !username || !subtitle || !userPicturePath || !postId) {
  //   // Handle the case when any of the essential properties is null or undefined
  //   return <div>Error: Friend data is missing</div>;
  // }


  // console.log("After null checks:", { friendId, name, username, subtitle, userPicturePath, postId });
  
  

  

  const isFriend =
  Array.isArray(friends) &&
  friends.find((friend) => friend && friend._id === friendId) !== undefined;
// Add null check here
  const isLoggedUser = friendId === _id;


  
  
  const handleDeletePost = async () => {
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
        dispatch(deletePost(postId)); // Assuming you have a deletePost action
        dispatch(showSnackbar({ severity: "success", message: "Post Successfully Deleted" }));
                // console.log("Post deleted successfully.");
      } else {
        dispatch(showSnackbar({ severity: "error", message: "Epic Fail. Please Try again in a few minutes" }));
        console.log("Failed to delete Post.");
      }
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: "Epic Fail. Please Try again in a few minutes" }));
      console.error("Error deleting the post:", error);
    }
    // console.log(message)
  };
  
  const patchFriend = async () => {
    try {
      const action = isFriend ? "remove" : "add";
      console.log(`Before PATCH - isFriend: ${isFriend}, action: ${action}`);
  
      const response = await fetch(`https://chirpskykite-server.onrender.com/users/${_id}/${friendId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }), // Specify the action
      });
  
      console.log("Patch response:", response);
  
      if (response.ok) {
        const data = await response.json();
  
        console.log("Patch data:", data);
  
        if (action === "remove") {
          dispatch(showSnackbar({ severity: "success", message: "Friend removed successfully" }));
        } else {
          dispatch(showSnackbar({ severity: "success", message: "You are now Friends" }));
        }
  
        // Update isFriend based on the action
        const updatedFriends = data;
        const updatedIsFriend = action === "add";
        console.log(`After PATCH - updatedIsFriend: ${updatedIsFriend}, updatedFriends:`, updatedFriends);
  
        // Dispatch the setFriends action with the updated information
        dispatch(setFriends({ friends: updatedFriends, isFriend: updatedIsFriend }));
        // dispatch(setFriends({ friends: data, isFriend: updatedIsFriend, friendId: friendId }));

      } else {
        dispatch(showSnackbar({ severity: "error", message: `Failed to ${action} friend.` }));
        console.log(`Failed to ${action} friend.`);
      }
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: `Failed to ${isFriend ? "remove" : "add"} friend. Error: ${error.message}` }));
      console.error(`Error ${isFriend ? "removing" : "adding"} friend:`, error);
    }
  };
  
  
  
  

  // const patchFriend = async () => {
  //   const response = await fetch(
  //     `http://localhost:3001/users/${_id}/${friendId}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json"
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   dispatch(setFriends({ friends: data }));
  // };


  
 
  return (
    <div> 
    <FlexBetween>
    <FlexBetween gap="1rem">
      <UserImage image={userPicturePath} size="55px" />
      <Box
        onClick={() => {
          navigate(`/profile/${friendId}`);
          navigate(0);
        }}
      >
        <Typography
          color={main}
          variant="h5"
          fontWeight="500"
          sx={{
            "&:hover": {
              color: "skyblue",
              cursor: "pointer",
            },
          }}
        >
          {name}
        </Typography>
        <Typography
          color={main}
          variant="h5"
          fontWeight="500"
          sx={{
            "&:hover": {
              color: "#8a0303",
              cursor: "pointer",
            },
          }}
        >
          {`@${username}`}
        </Typography>
        <Typography color={medium} fontSize="0.75rem">
          {subtitle}
        </Typography>
      </Box>
    </FlexBetween>
    {!isLoggedUser && (
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: "#8a0303" }} />
        ) : (
          <PersonAddOutlined sx={{ color: "green" }} />
        )}
      </IconButton>
    )}
    
    {isLoggedUser && (
      <IconButton
        postId={postId}
        onClick={handleDeletePost}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        <DeleteOutline sx={{ color: "#8a0303" }} />
       
      </IconButton>
      
      
    )}
  </FlexBetween>
  </div>
);
};

export default Friend;