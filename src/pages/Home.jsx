import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { CryptoProvider } from "../context/CryptoContext";

/**
 * Home component renders the main page of the application.
 * It renders the logo, navigation bar and the outlet for the routes.
 * The CryptoProvider is used to provide the cryptocurrency data to the components.
 * The main element is styled with tailwind classes.
 * The fixed element is used to create a background for the main element.
 * The z-10 class is used to make the background appear behind the content.
 * The first-letter class is used to center the first letter of the text.
 * The font-nunito class is used to set the font family to Nunito.
 * @returns {JSX.Element} The main element with the logo, navigation and outlet.
 */
const Home = () => {
  return (
    <CryptoProvider>
      <main className="relative flex flex-col items-center w-full h-full text-white first-letter:content-center font-nunito">
        {/* Create a background for the main element */}
        <div className="fixed w-screen h-screen bg-gray-300 -z-10"></div>
        {/* Render the logo component */}
        <Logo />
        {/* Render the navigation component */}
        <Navigation />
        {/* Render the outlet for the routes */}
        <Outlet />
      </main>
    </CryptoProvider>
  );
};

export default Home;
