import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CryptoContext } from "../context/CryptoContext";
import debounce from "lodash.debounce";

/**
 * SearchInput component renders an input field and a list of search results
 * below it. The user can search for coins by typing in the input field and
 * clicking on one of the search results. The component also handles the
 * onSearch and onCoinSelect functions.
 */
const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  let { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

  /**
   * Handles the input change event and updates the search text state.
   */
  let inputHandler = (e) => {
    e.preventDefault();
    let query = e.target.value;

    setSearchText(query);
    handleSearch(query);
  };

  /**
   * Handles the form submission event and calls the onSearch function.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  /**
   * Handles the coin selection event and calls the onCoinSelect function.
   */
  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  };

  return (
    <>
      <form
        className="relative flex items-center w-60 ml-7 font-nunito"
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
          <FaSearch className="w-full h-auto duration-300 ease-in-out fill-violet hover:scale-125" />
        </button>
      </form>

      {searchText.length > 0 ? (
        <ul className="absolute right-0 py-2 overflow-x-hidden bg-gray-200 rounded-lg w-96 top-11 h-96 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-violet scrollbar-track-gray-200">
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

/**
 * Search component renders a search input field and a list of search results.
 * The user can search for coins by typing in the input field.
 * The component also handles the onSearch function with a debounce of 2000ms.
 */
const Search = () => {
  // Get the getSearchResult function from the CryptoContext
  let { getSearchResult } = useContext(CryptoContext);

  // Create a debounced version of the getSearchResult function
  // with a delay of 2000ms
  const debounceFunc = debounce(function (value) {
    getSearchResult(value);
  }, 2000);

  return (
    // Render the SearchInput component with the debounced onSearch function
    <div className="relative">
      <SearchInput handleSearch={debounceFunc} />
    </div>
  );
};

export default Search;
