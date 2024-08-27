import { createContext, useLayoutEffect, useState } from "react";

// create context object
export const StorageContext = createContext({});

/**
 * StorageProvider Component
 *
 * This component provides data from browser local storage to its children
 *
 */
export const StorageProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);

  // save coin to local storage, if not already saved and update state
  const saveCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    if (oldCoins.includes(coinId)) {
      return null;
    } else {
      let newCoin = [...oldCoins, coinId];
      setAllCoins(newCoin);
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
  };

  const removeCoin = coinId;

  // Call getTrendData on initial render and whenever coinSearch changes
  useLayoutEffect(() => {
    let isThere = JSON.parse(localStorage.getItem("coins")) || false;

    if (!isThere) {
      // set the local storage with empty array
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      // set the state with the current values from the local storage
      let totalCoins = JSON.parse(localStorage.getItem("coins"));
      setAllCoins(totalCoins);
    }
  }, []);

  // Provide the TrendingContext to its children
  return (
    <StorageContext.Provider
      value={{
        saveCoin,
        allCoins,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
