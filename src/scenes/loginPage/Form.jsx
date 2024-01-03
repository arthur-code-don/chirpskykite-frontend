import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputAdornment,
  Snackbar,
  IconButton
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { Eye, SmileyXEyes } from 'phosphor-react';
import MuiAlert from '@mui/material/Alert';
import { showSnackbar } from "../../state/index";



const registerSchema = yup.object().shape({
  firstName: yup.string().required("required").min(2).max(13),
  lastName: yup.string().required("required").min(2).max(13),
  username: yup
    .string()
    .required("required")
    .matches(
      /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
      "invalid username format"
    )
    .min(4)
    .max(17),
  email: yup
    .string()
    .email("invalid email")
    .required("required")
    .matches(
      /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/,
      "invalid email format"
    ),
  password: yup.string().required("required").min(5),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup
    .string()
    .email("invalid email")
    .required("required")
    .matches(
      /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/,
      "invalid email format"
    ),
  password: yup.string().required("required"),
});


const initialValuesRegister = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  username: "",
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [showPassword, setShowPassword] = useState(false);




  const register = async (values, onSubmitProps) => {
    try {
      // this allows us to send form info with image
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
  
      formData.append("picturePath", values.picture.name);
  
      const savedUserResponse = await fetch(
        "https://chirpskykite-server.onrender.com/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();
  
      if (savedUserResponse.ok) {
        dispatch(showSnackbar({ severity: "success", message: "Registration Successful!" }));
        onSubmitProps.resetForm();
        setPageType("login");
      } else if (savedUser.errorCode === "Registration failed. User Already Exists. Please try again.") {
        dispatch(showSnackbar({ severity: "error", message: "Registration failed. User Already Exists. Please try again." }));
      } else {
        // If response status is not OK and no specific error code, throw an error with the response details
        throw savedUser;
      }
    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error);
      dispatch(showSnackbar({ severity: "error", message: "Registration failed. User Already Exists. Please try again." }));
    }
  };
  
  

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch("https://chirpskykite-server.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      console.log("Response Status:", loggedInResponse.status);
  
      const loggedIn = await loggedInResponse.json();
  
      if (loggedInResponse.ok) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        dispatch(showSnackbar({ severity: "success", message: "Login Successful!" }));
        navigate("/home");
        onSubmitProps.resetForm();
      } else {
        // If response status is not OK, throw an error with the response details
        throw loggedIn;
      }
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error);
      console.error("Server response:", error.status, error.statusText);
  
      dispatch(showSnackbar({ severity: "error", message: "Login failed. Please check your credentials." }));
    }
  };
  
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  
  return (




    <Box
      sx={{
        backgroundImage: "url('/assets/DOI.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{
                      backgroundColor: "white", opacity: ".7", color: "#8a0303", gridColumn: "span 2",
                      "& .MuiInputBase-input": {
                        color: "#8a0303", fontSize: "18px"
                      },
                    }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{
                      backgroundColor: "white", opacity: ".7", color: "#8a0303", gridColumn: "span 2",
                      "& .MuiInputBase-input": {
                        color: "#8a0303", fontSize: "18px"// Set the desired text color here
                      },
                    }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={Boolean(touched.location) && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                    sx={{
                      backgroundColor: "white", opacity: ".7", color: "#8a0303", gridColumn: "span 4",
                      "& .MuiInputBase-input": {
                        color: "#8a0303", fontSize: "18px" // Set the desired text color here
                      },
                    }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{
                      backgroundColor: "white", opacity: ".7", color: "#8a0303", gridColumn: "span 4",
                      "& .MuiInputBase-input": {
                        color: "#8a0303", fontSize: "18px" // Set the desired text color here
                      },
                    }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed #8a0303`}
                          p="1rem"
                          sx={{ color: "#8a0303", fontSize: "18px", textAlign: "center", "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Your Profile Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}

              <TextField
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={Boolean(touched.username) && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{
                  backgroundColor: "white", opacity: ".7", color: "#8a0303", gridColumn: "span 4",
                  "& .MuiInputBase-input": {
                    color: "#8a0303", fontSize: "18px" // Set the desired text color here
                  },
                }}
              />

              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  backgroundColor: "white", opacity: ".7", color: "#8a0303", gridColumn: "span 4",
                  "& .MuiInputBase-input": {
                    color: "#8a0303", fontSize: "18px" // Set the desired text color here
                  },
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <Eye
                          onClick={() => setShowPassword(false)}
                          style={{ cursor: 'pointer', color: "#8a0303", fontSize: '24px' }}
                        />
                      ) : (
                        <SmileyXEyes
                          onClick={() => setShowPassword(true)}
                          style={{ cursor: 'pointer', color: "#1DA1F2", fontSize: '24px' }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}


                sx={{
                  backgroundColor: "white", opacity: ".7", color: "#8a0303", gridColumn: "span 4",
                  "& .MuiInputBase-input": {
                    color: "#8a0303", fontSize: "18px" // Set the desired text color here
                  },
                }}
              />
            </Box>

            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: "#8a0303",
                  color: "whitesmoke",
                  "&:hover": { color: "#8a0303", backgroundColor: "skyblue" },
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: "#8a0303",
                  fontSize: "20px",
                  textAlign: "center",
                  "&:hover": {
                    cursor: "pointer",
                    color: "whitesmoke",
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </form>
        )}


      </Formik>



    </Box>
  );
};

export default Form;