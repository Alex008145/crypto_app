import { createContext, useLayoutEffect, useState } from "react";

// create context object
export const TrendingContext = createContext({});

/**
 * CryptoProvider Component
 *
 * This component provides the CryptoContext to its children.
 * It also handles the state and API calls for the app.
 */
export const TrendingProvider = ({ children }) => {
  const [trendData, setTrendData] = useState();

  // API call to get crypto data based on the selected coin
  const getTrendData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log(data);
      setTrendData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const resetTrendingResult = () => {
    getTrendData();
  };

  // Call getCryptoData on initial render and whenever coinSearch changes
  useLayoutEffect(() => {
    getTrendData();
  }, []);

  // Provide the CryptoContext to its children
  return (
    <TrendingContext.Provider
      value={{
        trendData,
        resetTrendingResult,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
};
