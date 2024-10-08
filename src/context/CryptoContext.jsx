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
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinData, setCoinData] = useState();

  const [coinSearch, setCoinSearch] = useState("");

  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(250);
  const [perPage, setPerPage] = useState(10);

  // API call to get crypto data based on the selected coin
  const getCryptoData = async () => {
    setCryptoData();

    setTotalPages(13220);

    // try {
    //   const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
    //     .then((res) => res.json())
    //     .then((json) => json);

    //   setTotalPages(data.length);
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log(data);
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // API call to get crypto data based on the selected coin
  const getCoinData = async (coinId) => {
    setCoinData();
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log("CoinData", data);
      setCoinData(data);
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

  const resetFunction = () => {
    setPage(1);
    setCoinSearch("");
  };

  // Call getCryptoData on initial render and whenever coinSearch changes
  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy, page, perPage]);

  // Provide the CryptoContext to its children
  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        resetFunction,
        setPerPage,
        perPage,
        getCoinData,
        coinData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
