import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined, Input, Check as CheckIcon
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton, TextField,
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { incrementViewedProfile, incrementImpressions } from "state";
import Friend from "components/Friend";

import '../../index.css'
import { id } from "date-fns/locale";

const UserWidget = ({ userId, picturePath }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action to increment viewedProfile
    dispatch(incrementViewedProfile(userId));
    dispatch(incrementImpressions(userId));
  }, [dispatch, userId]);



  // const socialProfiles 
  const socialProfiles = [
    { platform: "TwiXter", description: "Town Square", icon: "../assets/twitter.png" },
    { platform: "LinkedIn", description: "Strictly Business", icon: "../assets/linkedin.png" },
    { platform: "Personal",description: <>Q: Who am I?<br />¡ʎʞs ǝɥʇ oʇ ʞoo˥ :∀</>, icon: "../assets/tbird.png" },  ];

  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [editMode, setEditMode] = useState(Array(socialProfiles.length).fill(false));

  const currentUserId = useSelector((state) => state.user._id);

// State to manage edit mode for each social profile
  // const [twitterEditMode, setTwitterEditMode] = useState(false);
  // const [linkedinEditMode, setLinkedinEditMode] = useState(false);
// State to manage the input value in edit mode
  const [editValue, setEditValue] = useState(Array(socialProfiles.length).fill(''));  


// Function to toggle edit mode for each social profile
const handleToggleEditMode = (index) => {
  const newEditMode = [...editMode];
  newEditMode[index] = !newEditMode[index];
  setEditMode(newEditMode);
};






// Function to handle changes when editing social profile
const handleSocialProfileChange = async (index, newValue) => {
  try {
    // Update the local state
    const newEditValue = [...editValue];
    newEditValue[index] = newValue;
    setEditValue(newEditValue);

    // Update the backend with the new social profiles
    const response = await fetch(`https://chirpskykite-server.onrender.com/users/${userId}/social-profiles`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        socialProfiles: newEditValue.map((url, i) => ({
          platform: `Platform ${i + 1}`, // You can adjust the platform name as needed
          url: url || '', // If url is falsy, set it to an empty string
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    // Update the user data with the new URLs
    setUser((prevUser) => {
      const updatedUser = { ...prevUser };
      if (!updatedUser.socialProfiles) {
        updatedUser.socialProfiles = [];
      }

      updatedUser.socialProfiles = newEditValue.map((url, i) => ({
        platform: `Platform ${i + 1}`,
        url: url || '', // If url is falsy, set it to an empty string
      }));

      return updatedUser;
    });

    console.log(`Updated social profile at index ${index}:`, newValue);
  } catch (error) {
    console.error('Error updating social profiles:', error);
    // Handle error appropriately
  }
};


// // Function to handle changes when editing social profile
// const handleSocialProfileChange = async (index, newValue) => {
//   try {
//     // Update the backend with the new social profiles
//     await fetch(`http://localhost:3001/users/${userId}/social-profiles`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         socialProfiles: editValue.map((url, i) => ({
//           platform: `Platform ${i + 1}`, // You can adjust the platform name as needed
//           url,
//         })),
//       }),
//     });

//     // Update the local state
//     const newEditValue = [...editValue];
//     newEditValue[index] = newValue;
//     setEditValue(newEditValue);

//     // Update the user data with the new URL
//     setUser((prevUser) => {
//       const updatedUser = { ...prevUser };
//       if (!updatedUser.socialProfiles) {
//         updatedUser.socialProfiles = [];
//       }
//       if (!updatedUser.socialProfiles[index]) {
//         updatedUser.socialProfiles[index] = {};
//       }
//       updatedUser.socialProfiles[index].url = { url: newValue };
//       return updatedUser;
//     });

//     console.log(`Updated social profile at index ${index}:`, newValue);
//   } catch (error) {
//     console.error('Error updating social profiles:', error);
//     // Handle error appropriately
//   }
// };












  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    try {
      const response = await fetch(`https://chirpskykite-server.onrender.com/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error appropriately, such as displaying an error message to the user.
    }
  };
  
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    username,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper marginLeft="-2.3rem">
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color="#8a0303"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: "skyblue",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/profile/${userId}`)}

            >
              {firstName} {lastName}
            </Typography>
            <Typography 
            color="skyblue">{`@${username}`}</Typography>
            <Typography color={medium}>{friends.length} Friendships 🗽 Pretendships</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined 
            onClick={() => navigate(`/profile/${userId}`)}

        />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: "skyblue" }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: "green" }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}># of Profile Views</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your Chirps</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color="#8a0303" fontWeight="500" mb="1rem" textAlign="center">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
           
          </FlexBetween>
        </FlexBetween>
        {socialProfiles.map((profile, index) => (
        <FlexBetween gap="1rem" mb="0.5rem" key={index}>
        <FlexBetween gap="1rem">
            <img src={profile.icon} alt={profile.platform} width="60px" style={{ marginLeft: "-15px" }} />
            <Box textAlign="center">
              <Typography color="#8a0303" fontWeight="500">
                {profile.platform}
              </Typography>
            {/* Check if 'url' is an object */}
{profile.url && typeof profile.url === 'object' ? (
  <a href={profile.url.url} target="_blank" rel="noopener noreferrer">
    {profile.url.url}
  </a>
) : (
  <Typography color="#444">
    {profile.url && typeof profile.url === 'string' ? profile.url : ''}
  </Typography>
)}


              <Typography color="#444">{profile.description}</Typography>
            </Box>
          </FlexBetween>
 {/* Edit icon with onClick handler */}
 {currentUserId === userId && (
  <IconButton sx={{ color: "#8a0303" }} onClick={() => handleToggleEditMode(index)}>
    <EditOutlined />
  </IconButton>
)}






       {/* Render the URL in edit mode */}
{editMode[index] && (
  <div style={{ display: "flex", alignItems: "center" }}>
    <TextField
      placeholder={`Enter new ${profile.platform} link`}
      value={editValue[index]}
      onChange={(e) => handleSocialProfileChange(index, e.target.value)}
    />
    <IconButton sx={{ color: "#8a0303" }} onClick={() => handleToggleEditMode(index)}>
      <CheckIcon />
    </IconButton>
  </div>
)}

{/* Render the URL in non-edit mode */}
{!editMode[index] && user.socialProfiles && user.socialProfiles[index] && (
  <a href={user.socialProfiles[index].url && typeof user.socialProfiles[index].url === 'object' ? user.socialProfiles[index].url.url : user.socialProfiles[index].url} target="_blank" rel="noopener noreferrer">
    {user.socialProfiles[index].url && typeof user.socialProfiles[index].url === 'object' ? user.socialProfiles[index].url.url : user.socialProfiles[index].url}
  </a>
)}

      </FlexBetween>
    ))}
    </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;