"use client";
import * as React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex px-10 md:px-32 items-center py-10 md:py-5 w-full bg-white shadow-md fixed top-0 z-50">
      <Link href="/">
        <div className="flex-1 md:flex-none text-xl font-bold text-purple-600">
          NeuroScout
        </div>
      </Link>
      <div className="hidden md:flex md:items-center md:gap-4">
        <button>Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
