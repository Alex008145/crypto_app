import React, { useContext, useRef } from "react";
import Search from "./Search";
import { IoEnter } from "react-icons/io5";
import { CryptoContext } from "../context/CryptoContext";
import { IoIosArrowDropdown } from "react-icons/io";

const Filters = () => {
  let { setCurrency, currency, setSortBy } = useContext(CryptoContext);
  const currencyRef = useRef(null);

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  };

  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  };

  return (
    <div className="relative flex items-center justify-between w-full h-12 border-2 border-gray-100 rounded-lg">
      <Search />
      <div className="flex mr-7">
        <form
          className="relative flex items-center mr-12 font-nunito"
          onSubmit={handleCurrencySubmit}
        >
          <label
            htmlFor="currency"
            className="relative flex justify-center mr-2 font-bold"
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
          <button type="submit">
            <IoEnter className="w-full h-auto ml-2 text-violet" alt="submit" />
          </button>
        </form>
        <label className="relative flex items-center justify-center">
          <span className="mr-2 font-bold">Sort by:</span>
          <select
            name="sort"
            id="sort"
            className="py-0.5 pl-2 pr-10 mr-4 text-base leading-4 capitalize bg-gray-200 border border-transparent rounded-lg focus:outline-0 focus:border-violet selected:bg-violet"
            onClick={handleSort}
          >
            <option value="market_cap_desc">market cap desc</option>
            <option value="market_cap_asc">market cap asc</option>
            <option value="volume_desc">volume desc</option>
            <option value="volume_asc">volume asc</option>
            <option value="id_desc">id desc</option>
            <option value="id_asc">id asc</option>
            <option value="gecko_desc">gecko desc</option>
            <option value="gecko_asc">gecko asc</option>
          </select>
          {/* <IoIosArrowDropdown
            alt="submit"
            className="absolute fill-violet w-[2rem] h-auto right-1 top-2"
          /> */}
        </label>
      </div>
    </div>
  );
};

export default Filters;
