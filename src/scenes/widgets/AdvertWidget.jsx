import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper >
      <FlexBetween >
        <Typography 
        sx={{ml: "80px !important"}}
        color="#8a0303" variant="h5" fontWeight="500"  style={{ textAlign: "center !important" }}>
          Current Events
        </Typography>
      </FlexBetween>
      <iframe
  width="100%"
  height="auto"
  src="https://www.youtube.com/embed/nsDZomjhJ_Y"
  title="YouTube Video"
  style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
  allowFullScreen
/>
<div style={{ display: "flex", alignItems: "center" }}>
        <Typography color={main} style={{ marginRight: "1rem" }}>
          Stephen Gardner
        </Typography>
      
        <a
          href="https://www.yourbridgeplan.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: medium }}
        >
          https://www.yourbridgeplan.com
        </a>
      </div>
      <Typography color={medium} m="0.5rem 0">
        I bring you one of the only news sources i tune into. As you can see I am labeling this segment 'Current Events' Because our currency is currently not curing me.🌊🐋
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;