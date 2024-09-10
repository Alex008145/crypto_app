import React from "react";
import { Link } from "react-router-dom";
import logoSvg from "../assets/logo.svg";

/**
 * Logo component that displays the Crypto App logo.
 * It uses the Link component from react-router-dom to create a link to the home page.
 */
const Logo = () => {
  return (
    // Link to the home page
    <Link
      to="/"
      className="
        absolute top-[1.5rem]
        md:py-6 
        left-[1.5rem] 
        [text-decoration:none] 
        text-lg 
        text-violet
        flex
        items-center
        
        " // CSS classes for styling the Logo component
    >
      <img src={logoSvg} alt="Crypto App Logo" /> {/* Logo image */}
      <span>Crypto App</span> {/* Logo text */}
    </Link>
  );
};

export default Logo;
