'use client';
import React from 'react';
import MobileNav from './MobileNav';
import Nav from './Nav';

const ResponsiveNav = () => {
  const [showNav, setShowNav] = React.useState(false);
  const showNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);
  return (
    <>
      <Nav openNav={showNavHandler} />
      <MobileNav nav={showNav} closeNav={closeNavHandler} />
    </>
  );
};

export default ResponsiveNav;
