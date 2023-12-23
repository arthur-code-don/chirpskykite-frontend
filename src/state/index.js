import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    incrementViewedProfile: (state) => {
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            viewedProfile: state.user.viewedProfile + 1,
          },
        };
      }
      return state;
    },
    incrementImpressions: (state) => {
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            impressions: state.user.impressions + 1,
          },
        };
      }
      return state;
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
        console.error("Error updating user friends:", action.payload.error);
      }
    },
    deletePost: (state, action) => {
      const postIdToDelete = action.payload; // Pass the post ID to delete
      state.posts = state.posts.filter((post) => post._id !== postIdToDelete);
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      
      state.posts = updatedPosts;
    },
    setComments: (state, action) => {
      state.comments = action.payload.comments;
    },
    setComment: (state, action) => {
      const updatedComments = state.comments.map((comment) => {
        if (comment._id === action.payload.comment._id) return action.payload.comment;
        return comment;
      });
      
      state.comments = updatedComments;
    },

},


setCommentReplies: (state, action) => {
  // Assuming action.payload.commentId is the ID of the parent comment
  const { commentId, replies } = action.payload;
  
  const updatedComments = state.comments.map((comment) => {
    if (comment._id === commentId) {
      return { ...comment, replies };
    }
    return comment;
  });

  state.comments = updatedComments;
},
  
});







export const { incrementViewedProfile, incrementImpressions, setMode, setLogin, setLogout, setFriends, setPosts, setPost, deletePost, setComments, setComment,   setCommentReplies, setCommentReply  } =
  authSlice.actions;
export default authSlice.reducer;