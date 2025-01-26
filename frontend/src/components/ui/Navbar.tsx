"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";

const Navbar = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent md:bg-[your-color-scheme] z-50">
      <div className="flex items-center justify-between px-6 py-4 md:px-40 xl:px-64 border border-white/20 rounded-lg bg-[your-color-scheme] md:bg-transparent">
        <div className="flex-1">
          <Link href="/">
            <Image src={logo} alt="logo" className="w-20 md:w-24" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <span className="text-2xl font-bold">&times;</span> // Close button (X)
            ) : (
              <span className="text-2xl font-bold">&#9776;</span> // Hamburger menu
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:gap-4 text-white">
          <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Link href="/" className="text-lg button-link bg-white/80 text-black">
              View Research
            </Link>
            {showTooltip && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                Coming Soon
              </div>
            )}
          </div>
          <Link href="/test/6765254294b4101df01adc7a" className="text-lg button-link">
            Play Games
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-[your-color-scheme] border-t border-white/20">
          <Link href="/" className="text-lg text-white font-medium button-link">
            View Research
          </Link>
          <Link href="/test/6765254294b4101df01adc7a" className="text-lg text-white font-medium button-link">
            Play Games
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
