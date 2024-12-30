"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";

const Navbar = () => {
  return (
    <nav className="flex px-64 pt-5 justify-center">
      <div className="flex w-full border border-white/20 rounded-lg px-10">
        <div className="flex-1">
          <Link href="/">
            <Image src={logo} alt="logo" className="w-24" />
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <Link
            href="/"
            className=" bg-white/80 text-black text-lg button-link"
          >
            View Research
          </Link>
          <Link href="/" className=" text-lg button-link">
            Play Games
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
