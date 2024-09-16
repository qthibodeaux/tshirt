// Navbar.js
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { MobileNavbar, DesktopNavbar } from '../partials/index';

const Navbar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
};

export default Navbar;
