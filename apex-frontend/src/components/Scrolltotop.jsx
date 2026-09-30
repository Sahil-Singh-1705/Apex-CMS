import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = ({ visible }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <a href="#" onClick={scrollToTop} title="Go to top" className={`scroll-to-top ${visible ? 'visible' : ''}`}>
      <FaArrowUp  />
    </a>
  );
};

export default ScrollToTop;
