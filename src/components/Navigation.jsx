import React from "react";
import { NavLink } from "react-router-dom";

// Navigation component for rendering navigation links
const Navigation = () => {
  return (
    // Navigation bar styling
    <nav className="w-[40%] mt-16 flex justify-around align-middle border border-violet rounded-lg ">
      <NavLink
        to="/"
        end
        className={({ isActive }) => {
          return `w-full text-base text-center m-2.5  border-0 cursor-pointer rounded-lg capitalize font-semibold hover:scale-110 ease-in-out duration-300
          ${
            isActive
              ? "bg-violet text-gray-300"
              : "bg-gray-200 text-gray-100 hover:text-violet active:bg-violet active:text-gray-300"
          }`;
        }}
      >
        Crypto
      </NavLink>

      <NavLink
        to="/trending"
        className={({ isActive }) => {
          return `w-full text-base text-center m-2.5  border-0 cursor-pointer rounded-lg capitalize font-semibold hover:scale-110 ease-in-out duration-300
          ${
            isActive
              ? "bg-violet text-gray-300"
              : "bg-gray-200 text-gray-100 hover:text-violet active:bg-violet active:text-gray-300 "
          }`;
        }}
      >
        Trending
      </NavLink>

      <NavLink
        to="/saved"
        className={({ isActive }) => {
          return `w-full text-base text-center m-2.5  border-0 cursor-pointer rounded-lg capitalize font-semibold hover:scale-110 ease-in-out duration-300
          ${
            isActive
              ? "bg-violet text-gray-300"
              : "bg-gray-200 text-gray-100 hover:text-violet active:bg-violet active:text-gray-300 "
          }`;
        }}
      >
        Saved
      </NavLink>
    </nav>
  );
};

export default Navigation;
