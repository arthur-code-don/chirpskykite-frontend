import { Box, Typography, useTheme, useMediaQuery, Stack } from "@mui/material";
import Form from "./Form";
import '../../index.css'
import Logo from '../../scenes/navbar/logo.png';

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
       <Stack direction="row" alignItems="center">
          <img src={Logo} alt="FreeDom" width={60} height={60}  />
          <Typography
            fontWeight="bold"
            fontSize="32px"
            color="primary"
            mt="-5px"
            style={{
              marginLeft: isNonMobileScreens ? "auto" : "120px",
              marginRight: isNonMobileScreens ? "auto" : "0", // Center the Typography on mobile screens
            }}
          >
            Chirpsky
          </Typography>
        </Stack>
       
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" color="#8a0303" sx={{ mb: "1.5rem", textAlign: "center" }}>
          Welcome to Chirpsky, Set Your Words FREE!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;