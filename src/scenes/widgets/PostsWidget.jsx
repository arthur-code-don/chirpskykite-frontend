import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setComments } from "state";
import PostWidget from "./PostWidget";
import { format } from "date-fns";
import { Box, Divider, IconButton, Typography, useTheme, Tooltip, useMediaQuery } from "@mui/material";

// ADD ROUTE FOR VIDEO ALSO
const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("https://chirpskykite-server.onrender.com/posts/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const postsWithTimestamps = data.map((post) => {
      const formattedTimestamp = post.createdAt ? format(new Date(post.createdAt), "MMM dd, yyyy HH:mm") : "";
      return { ...post, formattedTimestamp };
    });

    const sortedPosts = postsWithTimestamps.sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
  );
    
    dispatch(setPosts({ posts: postsWithTimestamps }));
    
    };
  

    // ADD ROUTE FOR VIDEO ALSO
  const getUserPosts = async () => {
    const response = await fetch(`https://chirpskykite-server.onrender.com/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const postsWithTimestamps = data.map((post) => {
      const formattedTimestamp = post.createdAt ? format(new Date(post.createdAt), "MMM dd, yyyy HH:mm") : "";
      return { ...post, formattedTimestamp };
    });
    

    
    const sortedPosts = postsWithTimestamps.sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
  );
    dispatch(setPosts({ posts: postsWithTimestamps }));
    
    };
  
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(posts);
  //console.log(formattedTimestamp)

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
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
            formattedTimestamp,            
          }) => (
            
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              username={`${username}`}
              description={description}
              location={location}
              picturePath={picturePath}
              videoPath={videoPath}
              userPicturePath={userPicturePath}
              likes={likes}
              hates={hates}
              boomerangs={boomerangs ?? {}}
              comments={comments}
              formattedTimestamp={formattedTimestamp} 
                      
                   
              
            />
            
            
            
          )
          
        )
        
      ) : (
        <p>No Chirps available.</p>
        
        
      )}
      
      
    </>
    
  );
  
  
};

export default PostsWidget;
