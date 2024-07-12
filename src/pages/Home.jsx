import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { CryptoProvider } from "../context/CryptoContext";

const Home = () => {
  return (
    <CryptoProvider>
      <main className="relative flex flex-col items-center w-full h-full text-white first-letter:content-center font-nunito">
        <div className="fixed w-screen h-screen bg-gray-300 -z-10"></div>
        <Logo />
        <Navigation />

        <Outlet />
      </main>
    </CryptoProvider>
  );
};

export default Home;
