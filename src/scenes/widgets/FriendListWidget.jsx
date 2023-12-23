import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import '../../index.css'


const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const loggedInUserId = useSelector((state) => state.user._id);

  const getFriends = async () => {
    try {
      const response = await fetch(
        `https://chirpskykite-server/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error fetching friends:", error);
      // Handle the error appropriately
    }
  };

  useEffect(() => {
    getFriends();
  }, [userId, token]); // Include userId and token in the dependency array
  return (
    <WidgetWrapper
    >
      <Typography
        color="#8a0303"
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem", textAlign:"center"}}
      >
        Friendships 
      </Typography>
      <Box 
      display="flex" 
      flexDirection="column" 
      gap="1.5rem"
      maxHeight="400px"
      overflow="scroll"
      WebkitOverflowScrolling="auto"  // Enable smooth scrolling on WebKit browsers
      
    >
         {userId === loggedInUserId ? (
          // Display logged-in user's friend list
        Array.isArray(friends) && friends.length > 0 ? (
          friends.map((friend) => (
            // Add null and undefined checks for friend and its essential properties
            // friend && friend._id && friend.firstName && friend.lastName && friend.username && friend.picturePath ? (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                username={`${friend.username}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
              />
           
        ))
      ) : (
        <Typography>No friends available</Typography>
      )
         ) : (
         // Display other user's friend list
         Array.isArray(friends) && friends.length > 0 ? (
          friends.map((friend) => (
            // Add null and undefined checks for friend and its essential properties
            // friend && friend._id && friend.firstName && friend.lastName && friend.username && friend.picturePath ? (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                username={`${friend.username}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
              />
          
          ))
        ) : (
          <Typography>No friends available for this user</Typography>
        )
      )
    }
      
    </Box>
  </WidgetWrapper>
);
};

export default FriendListWidget;