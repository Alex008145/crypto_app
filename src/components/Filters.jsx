import React from "react";
import Search from "./Search";

const Filters = () => {
  return (
    <div className="relative flex items-center justify-between w-full h-12 border-2 border-gray-100 rounded-lg">
      <Search />
      <div>currency</div>
      <div>sorting</div>
    </div>
  );
};

export default Filters;
