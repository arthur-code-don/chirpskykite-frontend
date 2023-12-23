import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import React from 'react';
import ScrollToTopButton from "components/ScrollToTopButton"; 
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import css from "../../index.css"

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath, videoPath, friendId } = useSelector((state) => state.user);



  
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.3rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath}/>
          <PostsWidget userId={_id} videoPath={videoPath}/>

        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget id="friend-list" userId={_id} />
          </Box>
        )}

       
      </Box>



      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {/* <UserWidget userId={_id} /> */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={picturePath}  /> */}
          {/* <PostsWidget userId={_id} /> */}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <AdvertWidget /> */}
            <Box m="2rem 0" />
            {/* <FriendListWidget userId={_id} /> */}
          </Box>
          
        )}
      </Box>
      <Box>
        

      <button className="scroll-to-top-button" onClick={ScrollToTopButton}>
    <ScrollToTopButton/>
    </button>

</Box>
    </Box>
  );
};

export default HomePage;