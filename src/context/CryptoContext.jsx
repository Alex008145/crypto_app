import { createContext, useLayoutEffect, useState } from "react";

// create context object
export const CryptoContext = createContext({});

/**
 * CryptoProvider Component
 *
 * This component provides the CryptoContext to its children.
 * It also handles the state and API calls for the app.
 */
export const CryptoProvider = ({ children }) => {
  // State variables
  const [cryptoData, setCryptoData] = useState(); // Stores the crypto data
  const [searchData, setSearchData] = useState(); // Stores the search results
  const [coinSearch, setCoinSearch] = useState(""); // Keeps track of the selected coin

  // API call to get crypto data based on the selected coin
  const getCryptoData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinSearch}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log(data);
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // API call to search for coins based on the query
  const getSearchResult = async (query) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log(data);
      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  // Call getCryptoData on initial render and whenever coinSearch changes
  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch]);

  // Provide the CryptoContext to its children
  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
