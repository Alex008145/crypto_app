import React, { useContext } from "react";
import { TrendingContext } from "../context/TrendingContext";

const Trending = () => {
  const { trendData } = useContext(TrendingContext);

  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <div className="flex min-h-[60vh] flex-wrap justify-evenly mt-9 w-full py-8 border border-gray-100 rounded">
        {trendData &&
          trendData.map((coin) => <h1 key={coin.item.id}>{coin.item.name}</h1>)}
      </div>
    </section>
  );
};

export default Trending;
