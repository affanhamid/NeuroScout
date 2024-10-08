import * as React from "react";
import ShadNavbar from "../ui/navigation-menu";
import ShadSheet from "../ui/sheet";

const Navbar = () => {
  return (
    <nav className="flex px-10 md:px-32 items-center w-full py-10 md:py-5">
      <div className="flex-1 md:flex-none">NeuroScout</div>
      <div className="hidden md:flex flex-1 justify-center">
        <ShadNavbar />
      </div>
      <div className="hidden md:block">Get Started</div>
      <div>
        <ShadSheet className="md:hidden" />
      </div>
    </nav>
  );
};

export default Navbar;
