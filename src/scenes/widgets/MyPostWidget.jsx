import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  VideocamOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Tooltip
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
// import img from "../../../src/scenes/widgets/dogecoin.png";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import Linkify from 'react-linkify';
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setPost } from "state";

const MyPostWidget = ({ picturePath, videoPath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [videoErrorMessage, setVideoErrorMessage] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  // const [isVideoUploadVisible, setIsVideoUploadVisible] = useState(false);

  const MAX_FILE_SIZE = 70 * 1024 * 1024; // 70 MB
  const MAX_VIDEO_DURATION = 260; // 4 minutes and 20 seconds

  const [isPostButtonEnabled, setPostButtonEnabled] = useState(true);

  



  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;



  const getVideoDuration = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
  
      // Set up a listener to get the duration once metadata is loaded
      video.addEventListener("loadedmetadata", () => {
        resolve(video.duration);
      });
  
      // Set the video source to the file object
      video.src = URL.createObjectURL(file);
  
      // Load metadata to trigger the 'loadedmetadata' event
      video.load();
    });
  };
  


  const handleRejectedFiles = async (rejectedFiles) => {
    rejectedFiles.forEach(async (file) => {
      try {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        const allowedVideoTypes = ["video/mp4", "video/mov", "video/avi", "video/mpeg", "video/webm"];
  
        if (allowedVideoTypes.includes(file.type)) {
          // Handle video
          if (file.size > MAX_FILE_SIZE || (await getVideoDuration(file)) > MAX_VIDEO_DURATION) {
            setVideoErrorMessage("Invalid file. Check file size and duration. size limit 70mb, duration limit. 4:20");
            setPostButtonEnabled(false); // Disable the post button
          } else {
            setVideoErrorMessage("");
            setPostButtonEnabled(true); // Enable the post button
          }
        } else {
          setVideoErrorMessage("Invalid file type. Only supported video formats are allowed.");
          setPostButtonEnabled(false); // Disable the post button
        }
      } catch (error) {
        console.error(error);
        setVideoErrorMessage("Error while processing the video file.");
        setPostButtonEnabled(false); // Disable the post button
      }
    });
  };
  
  

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
  
    if (video) {
      formData.append("file", video);
      formData.append("videoPath", video.name);
    }
  
    if (image) {
      formData.append("file", image);
      formData.append("picturePath", image.name);
    }
  
    try {
      const response = await fetch(`https://chirpskykite-server.onrender.com/posts/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
  
      console.log(response);
  
      // Extract and parse the JSON data from the response body
      const responseData = await response.json();
  
      console.log(responseData);
  
      setVideo(null);
      setImage(null);
      dispatch(setPosts({ posts: responseData }));
      setPost("");
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    }
  };
  


  



  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    const allowedVideoTypes = ["video/mp4", "video/mov", "video/avi", "video/mpeg", "video/webm"];
  
    if (file && (allowedImageTypes.includes(file.type) || allowedVideoTypes.includes(file.type))) {
      if (allowedImageTypes.includes(file.type)) {
        // Handle image
        setImage(file);
        setImageErrorMessage("");
      } else if (allowedVideoTypes.includes(file.type)) {
        // Handle video
        setVideo(file);
        handleRejectedFiles([file]); // Validate the video file
      }
    } else {
      setImage(null);
      setVideo(null);
      setImageErrorMessage("Invalid file type. Only JPEG, PNG, GIF images, and supported video formats are allowed.");
      setVideoErrorMessage("Invalid file type. Only supported video formats are allowed.");
      setPostButtonEnabled(false); // Disable the post button
    }
  };




  return (
    <WidgetWrapper
    width="100%"
    >
      
      <FlexBetween 
      gap="1.5rem">
        <Linkify>

        <InputBase
        
placeholder="Don't just talk bout it. 
Be bout it"
onChange={(e) => setPost(e.target.value)}
  value={post}
  multiline  // Enable multiline input
  rows={4}    // Set the number of visible rows (adjust as needed)
  inputProps={{ maxLength: 187 }}  // Set character limit to 187
  sx={{
    width: "100%",
    backgroundColor: palette.neutral.light,
    borderRadius: "2rem",
    padding: "1rem 2rem",
    whiteSpace: "pre-wrap",  // Allow text wrapping
    wordWrap: "break-word",  // Break words when necessary
    minHeight: "6rem", // Adjust the height as needed
  }}
  
/>

</Linkify>
{/* Character limit message */}
<Typography variant="caption" color="text.secondary" sx={{ textAlign: "right" }}>
        {post.length}/187 <span className="kharacters">kharacters</span>
      </Typography>
      <UserImage image={picturePath} />

      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png, .gif"
            multiple={false}
            onDrop={handleDrop} 
            >          
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { color:"#8a0303",cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p className="upload-img-text">Upload IMAGES or GIFS here. </p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

{isVideo && (
  <Box 
  border={`1px solid ${medium}`} 
  borderRadius="5px" 
  mt="1rem" 
  p="1rem">
    <Dropzone
      acceptedFiles=".mp4,.mov, .avi, .mpeg, .webm"
      multiple={false}
      onDrop={handleDrop}
    >
      {({ getRootProps, getInputProps }) => (
        <FlexBetween>
          <Box
            {...getRootProps()}
            border={`2px dashed ${palette.primary.main}`}
            p="1rem"
            width="100%"
            sx={{ "&:hover": { color: "#8a0303", cursor: "pointer" } }}
          >
            <input {...getInputProps()} />
            {!video ? (
              <p className="upload-vid-text">Upload Videos not exceeding 4:20 length .</p>
            ) : (
              <FlexBetween>
                <Typography>{video.name}</Typography>
                <EditOutlined />
              </FlexBetween>
            )}
          </Box>
          {video && (
            <IconButton 
            onClick={() => setVideo(null)} 
            sx={{ width: "15%" }}
            >
              <DeleteOutlined />
            </IconButton>
          )}
        </FlexBetween>
      )}
    </Dropzone>
  </Box>
)}


       {videoErrorMessage && (
        <Typography variant="caption" color="error" sx={{ marginTop: "0.5rem", marginLeft:"8rem"}}>
          {videoErrorMessage}
        </Typography>
     )} 


      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          
        <Tooltip title="Upload Image">
          <ImageOutlined sx={{ color: "green" }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: "red" } }}
          >
            Image
          </Typography>
          </Tooltip>
          {!isNonMobileScreens && (
            <FlexBetween gap="0.25rem" onClick={() => setIsVideo
              (!isVideo)}>
                <Tooltip title="Video Upload">
              <VideocamOutlined sx={{ color: "red", marginLeft: "5px"}} />
              <Typography color={mediumMain} sx={{ marginLeft:"5px", "&:hover": { cursor: "pointer", color: "green"} }}>Video</Typography>
              </Tooltip>
            </FlexBetween>

            

            
          )}
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem" onClick={() => setIsVideo
              (!isVideo)}>
                <Tooltip title="Video Upload">
              <VideocamOutlined sx={{ color: "red" }} />
              <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: "green" } }}>Video</Typography>
              </Tooltip>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
            <Tooltip title="Send Doge">
            <img src="../assets/dogecoin.png" alt="twitter" width="50px" style={{ marginLeft: "12px", marginTop: "-18px" }}/>
              {/* <AttachFileOutlined sx={{ color: mediumMain }} /> */}
              <Typography color={mediumMain}>Dog£ Pound </Typography>
              </Tooltip>
            </FlexBetween>

           <FlexBetween gap="0.25rem" style={{ alignItems: "center", flexDirection: "column" }}>
            <Tooltip title="What's next? Can't Tell">
              <img src="../assets/walkie-talkie.png" alt="twitter" width="30px" style={{ marginLeft: "1px" }} />
              <Typography color={mediumMain}>Chirp</Typography>
              </Tooltip>
            </FlexBetween>

          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        <Button
  disabled={!post || !isPostButtonEnabled}
  onClick={handlePost}
  sx={{
    color: "skyblue",
    backgroundColor: "#8a0303",
    fontFamily: "mortal kombat",
    borderRadius: "3rem",
    "&:hover": { backgroundColor: "skyblue", color: "#8a0303" }
  }}
>
  Chirp
</Button>

      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;