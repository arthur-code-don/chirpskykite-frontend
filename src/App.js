import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, IconButton, Snackbar, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import MuiAlert from '@mui/material/Alert';
import state, { closeSnackbar } from "state";



const vertical = "bottom";
const horizontal = "center";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  // const authState = useSelector((state) => state.snackbar);

  const { open, message, severity } = useSelector((state) => state.snackbar);

  const dispatch = useDispatch();




  return (
    <>

      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>


      {/* Snackbar for notifications */}
      {/* <Snackbar
  open={snackbarOpen}
  autoHideDuration={6000} // Adjust the duration as needed
  onClose={handleSnackbarClose}
>
  <Alert
    onClose={handleSnackbarClose}
    severity={snackbarSeverity}
    action={
      <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    }
    anchorOrigin={{ vertical, horizontal }} 
  >
    {snackbarMessage}
  </Alert>
</Snackbar> */}

      {/* {message && open ?
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            dispatch(closeSnackbar());
          }}
        >


          <Alert onClose={() => {
            dispatch(closeSnackbar());
          }} severity={severity}
            sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar> : <></>} */}

      {/* Snackbar for notifications */}

      {message && open ? <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={4000}
        key={vertical + horizontal}
        onClose={() => {
          dispatch(closeSnackbar());
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closeSnackbar());
          }}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar> : <></>}




    </>
  );
}

export default App;