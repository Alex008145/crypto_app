import React, { useContext } from "react";
import { TrendingContext } from "../context/TrendingContext";
import TrendingCoin from "../components/TrendingCoin";
import { Link, Outlet } from "react-router-dom";
import { TbZoomReset } from "react-icons/tb";
import { StorageContext } from "../context/StorageContext";
import { CiStar } from "react-icons/ci";
import { CryptoContext } from "../context/CryptoContext";

const SaveBtn = ({ data }) => {
  // import saved coins from local storage
  const { saveCoin, allCoins, removeCoin } = useContext(StorageContext);

  const handleClick = (e) => {
    e.preventDefault();
    saveCoin(data.id);

    // if coin is already saved, remove it from local storage
    if (allCoins.includes(data.id)) {
      removeCoin(data.id);
    } else {
      saveCoin(data.id);
    }
  };

  return (
    <button
      className="border-0 cursor-pointer outline-0 bg-none"
      onClick={(e) => handleClick(e)}
    >
      <CiStar
        className={`w-auto h-8 ml-2 duration-300 ease-in-out 
          ${allCoins.includes(data.id) ? "fill-violet" : "fill-gray-100"}
          fill-gray-100 hover:fill-violet hover:scale-125`}
      />
    </button>
  );
};

/**
 * Saved component renders a list of saved coins.
 *
 *
 */
const Saved = () => {
  const { savedData, resetSavedResult } = useContext(StorageContext);
  let { currency } = useContext(CryptoContext);

  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative border border-gray-100 rounded-xl">
      <div className="w-full min-h-[60vh]  ">
        {/* render each coin in the trending list as a TrendingCoin component */}
        {savedData && (
          <table className="w-full table-auto">
            <thead className="text-base font-medium text-gray-100 capitalize border-b border-gray-100">
              <tr>
                <th className="py-1">asset</th>
                <th className="py-1">name</th>
                <th className="py-1">price</th>
                <th className="py-1">total volume</th>
                <th className="py-1">market cap change</th>
                <th className="py-1">1H</th>
                <th className="py-1">24H</th>
                <th className="py-1">7D</th>
              </tr>
            </thead>
            <tbody>
              {savedData.map((data) => {
                return (
                  <tr
                    key={data.id}
                    className="text-base text-center border-b border-gray-100 hover:bg-gray-200 "
                  >
                    <td className="flex items-center py-4 uppercase">
                      <SaveBtn data={data} />
                      <img
                        src={data.image}
                        alt={data.name}
                        className="w-[2rem] h-[2rem] mx-1.5"
                      />
                      <span>
                        <Link to={`/${data.id}`} className="cursor-pointer">
                          {data.symbol}
                        </Link>
                      </span>
                    </td>
                    <td className="py-4">
                      <Link to={`/${data.id}`} className="cursor-pointer">
                        {data.name}
                      </Link>
                    </td>
                    <td className="py-4">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: currency,
                      }).format(data.current_price)}
                    </td>
                    <td className="py-4">{data.total_volume}</td>
                    <td className="py-4">
                      {data.market_cap_change_percentage_24h}%
                    </td>
                    <td
                      className={
                        data.price_change_percentage_1h_in_currency > 0
                          ? "py-4 text-green"
                          : "py-4 text-red"
                      }
                    >
                      {Number(
                        data.price_change_percentage_1h_in_currency
                      ).toFixed(2)}
                    </td>
                    <td
                      className={
                        data.price_change_percentage_24h_in_currency > 0
                          ? "py-4 text-green"
                          : "py-4 text-red"
                      }
                    >
                      {Number(
                        data.price_change_percentage_24h_in_currency
                      ).toFixed(2)}
                    </td>
                    <td
                      className={
                        data.price_change_percentage_7d_in_currency > 0
                          ? "py-4 text-green"
                          : "py-4 text-red"
                      }
                    >
                      {Number(
                        data.price_change_percentage_7d_in_currency
                      ).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <button
          className="w-[2rem] ml-4 hover:scale-125 transition-all transition-ease absolute right-0 -top-10"
          onClick={resetSavedResult}
        >
          <TbZoomReset className="w-full h-auto text-violet" />
        </button>
      </div>
      <Outlet />
    </section>
  );
};

export default Saved;
