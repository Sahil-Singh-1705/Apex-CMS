"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Important: Import AOS styles

const AOSProvider = ({ children }) => {
  useEffect(() => {
    // Initialize AOS with your desired settings
    AOS.init({
      duration: 800,
      once: true, // Changed from false to true to animate only once
      offset: 100,
      delay: 50,
      easing: 'ease-in-out',
      mirror: false, // Changed from true to false to prevent animation on scroll up
      anchorPlacement: 'top-bottom',
    });

    // Refresh AOS on window load and resize
    const handleRefresh = () => {
      AOS.refresh();
    };

    window.addEventListener('load', handleRefresh);
    window.addEventListener('resize', handleRefresh);

    // Multiple refreshes for dynamic content
    const timeouts = [
      setTimeout(() => AOS.refresh(), 100),
      setTimeout(() => AOS.refresh(), 500),
      setTimeout(() => AOS.refresh(), 1000),
    ];

    return () => {
      window.removeEventListener('load', handleRefresh);
      window.removeEventListener('resize', handleRefresh);
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return children;
};

export default AOSProvider;