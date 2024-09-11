import React, { useContext, useRef } from "react";
import Search from "./Search";
import { IoEnter } from "react-icons/io5";
import { CryptoContext } from "../context/CryptoContext";
import { TbZoomReset } from "react-icons/tb";

/**
 * Filters component is responsible for rendering the filters section of the application.
 * It allows the user to change the currency and sort the data.
 */
const Filters = () => {
  // Destructuring the values from the CryptoContext
  let { setCurrency, currency, setSortBy, resetFunction } =
    useContext(CryptoContext);
  const currencyRef = useRef(null); // Creating a reference for the currency input field

  //  Sets the currency value and clears the input field.
  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  };

  // Sets the sort value based on the selected option.
  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  };

  return (
    <div className="relative items-center justify-between w-full p-5 border border-gray-100 rounded-lg lg:flex lg:h-12">
      <Search />
      <div className="lg:flex lg:mr-7">
        <form
          className="items-center mr-12 lg:flex lg:relative font-nunito"
          onSubmit={handleCurrencySubmit}
        >
          <label
            htmlFor="currency"
            className="justify-center mr-2 font-bold lg:relative lg:flex"
          >
            Currency:
          </label>
          <input
            type="text"
            name="currency"
            ref={currencyRef}
            placeholder={currency.toUpperCase()}
            className="w-16 pl-2 leading-4 bg-gray-200 border border-transparent rounded-lg placeholder:text-gray-100 required outline-0 focus:border-violet"
          />
          <button type="submit" className="w-8 h-8">
            <IoEnter
              className="w-full h-auto pt-3 ml-2 duration-300 ease-in-out lg:pt-0 text-violet hover:scale-125"
              alt="submit"
            />
          </button>
        </form>
        <label className="items-center justify-center lg:flex lg:relative">
          <span className="mr-2 font-bold w-[7rem]">Sort by:</span>
          <select
            name="sort"
            id="sort"
            className="w-[50%] lg:w-[90%] my-2.5 py-0.5 pl-2 lg:pr-10 lg:mr-4 text-base leading-4 capitalize bg-gray-200 border border-transparent rounded-lg outline-0 focus:border-violet"
            onClick={handleSort}
          >
            {/* Providing options for sorting the data */}
            <option value="market_cap_desc">market cap desc</option>
            <option value="market_cap_asc">market cap asc</option>
            <option value="volume_desc">volume desc</option>
            <option value="volume_asc">volume asc</option>
            <option value="id_desc">id desc</option>
            <option value="id_asc">id asc</option>
            <option value="gecko_desc">gecko desc</option>
            <option value="gecko_asc">gecko asc</option>
          </select>
        </label>
        <button
          className="absolute right-5 top-14 lg:right-0 lg:top-0 w-[2rem] ml-4 hover:scale-125 transition-all transition-ease lg:relative"
          onClick={resetFunction}
        >
          <TbZoomReset className="w-full h-auto text-violet" />
        </button>
      </div>
    </div>
  );
};

export default Filters;
