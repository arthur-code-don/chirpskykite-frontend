// ScrollToTopButton.js

import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className="scroll-to-top-button" onClick={handleScrollToTop}>
      <ArrowUpwardIcon />
    </button>
  );
};

export default ScrollToTopButton;
