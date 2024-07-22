import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = () => {
  return (
    <div className="flex items-center">
      <ul className="flex items-center justify-end text-sm">
        <li className="flex items-center">
          <button className="outline-0 ">
            <FaArrowLeft className="h-auto w-7 fill-violet" />
          </button>
        </li>
        <li>...</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>...</li>
        <li>last-page</li>
        <li>
          <FaArrowRight className="h-auto w-7 fill-violet" />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
