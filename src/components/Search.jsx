import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CryptoContext } from "../context/CryptoContext";
import debounce from "lodash.debounce";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  let { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

  let inputHandler = (e) => {
    e.preventDefault();
    let query = e.target.value;

    setSearchText(query);
    handleSearch(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  };

  return (
    <>
      <form
        className="relative flex items-center ml-7 w-96 font-nunito"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="search"
          onChange={inputHandler}
          value={searchText}
          className="w-full pl-2 bg-gray-200 border border-transparent rounded-lg placeholder:text-gray-100 required outline-0 focus:border-violet"
          placeholder="Search for coins..."
        />
        <button type="submit" className="absolute cursor-pointer right-1">
          <FaSearch className="w-full h-auto fill-violet" />
        </button>
      </form>

      {searchText.length > 0 ? (
        <ul className="absolute right-0 py-2 overflow-x-hidden bg-gray-200 rounded-lg w-96 top-11 h-96 bg-opacity-60 backdrop-blur-md">
          {searchData ? (
            searchData.map((coin) => {
              return (
                <li
                  className="flex items-center my-2 ml-4 cursor-pointer"
                  key={coin.id}
                  onClick={() => selectCoin(coin.id)}
                >
                  <img
                    className="w-[2rem] h-[2rem] mx-1.5"
                    src={coin.thumb}
                    alt={coin.name}
                  />
                  <span>{coin.name}</span>
                </li>
              );
            })
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <div
                className="w-8 h-8 border-4 rounded-full border-violet border-b-gray-200 animate-spin"
                role="status"
              />
              <span className="ml-2">Searching...</span>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};

const Search = () => {
  let { getSearchResult } = useContext(CryptoContext);

  const debounceFunc = debounce(function (value) {
    getSearchResult(value);
  }, 2000);

  return (
    <div className="relative">
      <SearchInput handleSearch={debounceFunc} />
    </div>
  );
};

export default Search;
