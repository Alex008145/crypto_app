import React, { useContext } from "react";
import { TrendingContext } from "../context/TrendingContext";
import TrendingCoin from "../components/TrendingCoin";
import { Outlet } from "react-router-dom";
import { TbZoomReset } from "react-icons/tb";

/**
 * Trending component renders a list of trending coins.
 * It fetches the data from the TrendingContext and maps over it
 * to render each coin as a TrendingCoin component.
 */
const Trending = () => {
  const { trendData, resetTrendingResult } = useContext(TrendingContext);

  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <div className="w-full min-h-[60vh] py-8 flex flex-wrap justify-evenly">
        {/* render each coin in the trending list as a TrendingCoin component */}
        {trendData &&
          trendData.map((coin) => (
            <TrendingCoin key={coin.item.id} data={coin.item} />
          ))}

        <button
          className="w-[2rem] ml-4 hover:scale-125 transition-all transition-ease absolute right-0 -top-10"
          onClick={resetTrendingResult}
        >
          <TbZoomReset className="w-full h-auto text-violet" />
        </button>
      </div>
      <Outlet />
    </section>
  );
};

export default Trending;
