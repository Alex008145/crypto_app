import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <form className="relative flex items-center ml-7 w-96 font-nunito ">
      <input
        type="text"
        name="search"
        className="w-full pl-2 bg-gray-200 border border-transparent rounded-lg placeholder:text-gray-100 required outline-0 focus:border-cyan"
        placeholder="search for coins..."
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
};

export default Search;
