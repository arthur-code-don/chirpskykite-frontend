import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate, Link } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import Logo from "./favicon.png";
import LogoSeal from "./logo.png";
import { FaEthereum } from "react-icons/fa6";
import '../../index.css';



import DOI from "./DOI.png"
const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  const username = `@${user.username}`;


  const handleHelpDialogOpen = () => {
    setIsHelpDialogOpen(true);
  };

  const handleHelpDialogClose = () => {
    setIsHelpDialogOpen(false);
  };


  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <img src={Logo} alt="Chirpsky Logo" style={{ height: '40px', marginRight: '10px' }} />
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="#8a0303"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: "skyblue",
              cursor: "pointer",
            },
          }}
        >
          Chirpsky
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase

              placeholder="Soul Searching Koming Soon..."
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton >
              <Search />
            </IconButton>




          </FlexBetween>
        )}
        <div>
          <button
            style={{
              backgroundColor: isHovered ? "skyblue" : "#8a0303",
              border: "none",
              color: isHovered ? "#8a0303" : "white",
              textDecoration: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "25px",
              transition: "background-color 0.3s" // Optional: Add a smooth transition
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <a
              className="buy-with-crypto"
              href="https://commerce.coinbase.com/checkout/9d0dbe90-bad6-4b61-847d-f285a1af8f18"
              target="_blank"
              rel="noopener"
              style={{
                color: "inherit",
                textDecoration: "none",
                fontSize: "12px",
                backgroundColor: isHovered ? "skyblue" : "transparent",
                display: "inline-block",
              }}
            >
              Contribute Crypto
            </a>
          </button>
          <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807"></script>
        </div>




      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <a href="https://www.chirpskyXChange.net" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Tooltip title="ChirpskyXChange ♦">
              <IconButton>
                <FaEthereum sx={{ fontSize: "25px" }} />
              </IconButton>
            </Tooltip>
          </a>
          <a href="https://www.chirpskykite.net" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Tooltip title="ChirpskyKite">
              <IconButton>
                <Message sx={{ fontSize: "25px" }} />
              </IconButton>
            </Tooltip>
          </a>
          <Notifications sx={{ fontSize: "25px" }} />
          <Tooltip title="Koming Soon"> <Help sx={{ fontSize: "25px", cursor: "pointer" }} onClick={handleHelpDialogOpen} /></Tooltip>
          <FormControl variant="standard" value={username}>
            <Select
              value={username}
              sx={{
                color: "red",
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={username} sx={{ color: "green" }}>
                <Typography >{username}</Typography>
              </MenuItem>
              <MenuItem>

                <Link to="https://chirpkingpins.netlify.app/" target="_blank" style={{ textDecoration: 'none' }}>
                  <span style={{ color: 'red', marginRight: "0.5rem" }}>King</span>
                  <span style={{ color: 'green' }}>Pins</span>
                </Link>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <a href="https://www.chirpskyXChange.net" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Tooltip title="ChirpskyXChange ♦">
                <IconButton>
                  <FaEthereum sx={{ fontSize: "25px" }} />
                </IconButton>
              </Tooltip>
            </a>
            <a href="https://www.chirpskykite.net" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Tooltip title="ChirpskyKite">
                <IconButton>
                  <Message sx={{ fontSize: "25px" }} />
                </IconButton>
              </Tooltip>
            </a>
            <Notifications sx={{ fontSize: "25px" }} />
            <Tooltip title="Koming Soon"> <Help sx={{ fontSize: "25px", cursor: "pointer" }} onClick={handleHelpDialogOpen} /></Tooltip>
            <FormControl variant="standard" value={username}>
              <Select
                value={username}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={username}>
                  <Typography color="red">{username}</Typography>
                </MenuItem>

                <MenuItem>

                  <Link to="https://chirpkingpins.netlify.app/" target="_blank" style={{ textDecoration: 'none' }}>
                    <span style={{ color: 'red', marginRight: "0.5rem" }}>King</span>
                    <span style={{ color: 'green' }}>Pins</span>
                  </Link>
                </MenuItem>

                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>


          </FlexBetween>


        </Box>


      )}


      {/* HELP DIALOG */}
      <Dialog open={isHelpDialogOpen} onClose={handleHelpDialogClose} maxWidth="md" fullWidth>
        <DialogTitle style={{ textAlign: "center", color: "#1DA1F2", fontFamily: 'MuRdOiNk' }}>
          {/* title */}
          Welcome to Chirpsky
        </DialogTitle>
        <DialogContent>
          Please make yourselves at home, while many features are still being built, you could expect some things might not function as intended, but rest assured... if there is a demand for certain features, and what might you like to have in a social networking platform, please leave a post or comment of what you want. I truly care about more than myself.
          <Box
            sx={{
              backgroundImage: `url(${DOI})`,
              backgroundSize: "cover",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              textAlign: "center",
              minHeight: "500px",
              position: "relative", // Make the position relative
            }}

          >
            <div
              style={{
                position: "absolute",
                top: "50%", // Adjust these values for logo positioning
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "170px", // Adjust the width of the logo
                height: "170px", // Adjust the height of the logo
                backgroundImage: `url(${LogoSeal})`, // Replace with the path to your logo
                backgroundSize: "cover",
                zIndex: 1,
              }}
            />  <Typography mt={33} variant="h5" style={{ textAlign: "center", color: "red", fontSize: "16px" }}>"Government is not reason, it is not eloquence, it is force; like fire, a troublesome servant and a fearful master."
              "Happiness and moral duty are inseparably connected." - George Washington</Typography>

          </Box>


          <Typography variant="h5" style={{ textAlign: "center", color: "#1DA1F2", zIndex: 2 }}>Freedom is Just. Freedom is Just. Freedom is Just a click away.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHelpDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </FlexBetween>

  );
};

export default Navbar;