import React, { useContext, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CryptoContext } from "../context/CryptoContext";

const Pagination = () => {
  let { page, setPage, totalPages } = useContext(CryptoContext);

  const totalNumber = Math.ceil(totalPages / 10);
  const firstPage = 1;

  const next = () => {
    if (page === totalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= totalNumber) {
      setPage(totalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    setPage(page - 3);
  };

  return (
    <div className="flex items-center">
      <ul className="flex items-center justify-end text-sm">
        {page !== 1 ? (
          <li className="flex items-center">
            <button className="w-8 outline-0" onClick={prev}>
              <FaArrowLeft className="h-auto w-7 fill-violet" alt="left" />
            </button>
          </li>
        ) : null}

        {page > 2 ? (
          <li>
            <button
              onClick={() => setPage(firstPage)}
              className="flex items-center justify-center w-8 h-8 rounded-full outline-0 hover:text-violet bg-gray-200 mx-1.5 hover:scale-125 ease-in duration-300"
            >
              {firstPage}
            </button>
          </li>
        ) : null}
        {page > 3 ? (
          <li>
            <button
              onClick={multiStepPrev}
              className="flex items-center justify-center w-8 h-8 text-lg rounded-full outline-0 hover:text-violet"
            >
              ...
            </button>
          </li>
        ) : null}
        {page !== 1 ? (
          <li>
            <button
              onClick={prev}
              className="flex items-center justify-center w-8 h-8 rounded-full outline-0 hover:text-violet bg-gray-200 mx-1.5 hover:scale-125 ease-in duration-300"
            >
              {page - 1}
            </button>
          </li>
        ) : null}
        <li>
          <button
            disabled
            className="flex items-center justify-center w-8 h-8 rounded-full outline-0 text-gray-300   bg-violet mx-1.5  "
          >
            {page}
          </button>
        </li>

        {page + 1 !== totalNumber && page !== totalNumber ? (
          <li>
            <button
              onClick={next}
              className="flex items-center justify-center w-8 h-8 rounded-full outline-0 hover:text-violet bg-gray-200 mx-1.5 hover:scale-125 ease-in duration-300"
            >
              {page + 1}
            </button>
          </li>
        ) : null}

        {page + 1 !== totalNumber && page !== totalNumber ? (
          <li>
            <button
              onClick={multiStepNext}
              className="flex items-center justify-center w-8 h-8 text-lg rounded-full outline-0 hover:text-violet"
            >
              ...
            </button>
          </li>
        ) : null}

        {page !== totalNumber ? (
          <li>
            <button
              onClick={() => setPage(totalNumber)}
              className="flex items-center justify-center w-8 h-8 rounded-full outline-0 hover:text-violet bg-gray-200 mx-1.5 hover:scale-125 ease-in duration-300"
            >
              {totalNumber}
            </button>
          </li>
        ) : null}

        {page !== totalNumber ? (
          <li>
            <button className="w-8 outline-0" onClick={next}>
              <FaArrowRight className="h-auto w-7 fill-violet" alt="right" />
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default Pagination;
