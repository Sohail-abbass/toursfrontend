"use client";

import React, { useState } from 'react';
import './style.css';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbarContainer">
        {/* Logo Section */}
        <Link href="/" className="logoLink">
          <div className="logo">
            <Image src="/logo.png" alt="Adventure Tours Logo" width={60} height={60} priority />
            <span className="logoText">Adventure Tours</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="desktopMenu">
          <Link href="/" className="navLink">Home</Link>
          <Link href="/page/package" className="navLink">Packages</Link>
          <Link href="/public/about" className="navLink">About</Link>
          <Link href="/public/contact" className="navLink">Contact</Link>
          <Link href="/page/package" className="ctaButton">
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobileMenuButton" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobileMenu">
          <Link href="/" className="mobileNavLink" onClick={toggleMobileMenu}>Home</Link>
          <Link href="/page/package" className="mobileNavLink" onClick={toggleMobileMenu}>Packages</Link>
          <Link href="/public/about" className="mobileNavLink" onClick={toggleMobileMenu}>About</Link>
          <Link href="/public/contact" className="mobileNavLink" onClick={toggleMobileMenu}>Contact</Link>
          <Link href="/page/package" className="mobileCtaButton" onClick={toggleMobileMenu}>
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;