"use client";
import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";

const Navbar = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <nav className="flex px-40 xl:px-64 pt-5 justify-center">
      <div className="flex w-full border border-white/20 rounded-lg px-10">
        <div className="flex-1">
          <Link href="/">
            <Image src={logo} alt="logo" className="w-24" />
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <div 
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
          <Link
            href="/"
            className=" bg-white/80 text-black text-lg button-link"
          >
            View Research
          </Link>
            {showTooltip && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                Coming Soon
              </div>
            )}
          </div>
          <Link
            href="/test/6765254294b4101df01adc7a"
            className=" text-lg button-link"
          >
            Play Games
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;