import React, { useContext } from "react";

import { CryptoContext } from "../context/CryptoContext";
import { CiStar } from "react-icons/ci";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { StorageContext } from "../context/StorageContext";

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
 * TableComponent renders a table of cryptocurrencies with their respective
 * information like name, price, total volume, and market cap change.
 *
 * @returns {JSX.Element} A table element with the cryptocurrency data.
 */
const TableComponent = () => {
  let { cryptoData, currency } = useContext(CryptoContext);

  return (
    <>
      <div className="flex flex-col border border-gray-100 rounded-lg mt-9">
        {cryptoData ? (
          <table className="w-full table-auto">
            <thead className="text-base font-medium text-gray-100 capitalize border-b border-gray-100">
              <tr>
                <th className="py-1">asset</th>
                <th className="py-1">name</th>
                <th className="py-1">price</th>
                <th className="hidden py-1 md:table-cell">total volume</th>
                <th className="hidden py-1 sm:table-cell">market cap change</th>
                <th className="hidden py-1 lg:table-cell">1H</th>
                <th className="hidden py-1 lg:table-cell">24H</th>
                <th className="hidden py-1 lg:table-cell">7D</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((data) => {
                return (
                  <tr
                    key={data.id}
                    className="text-base text-center border-b border-gray-100 hover:bg-gray-200 last:border-b-0"
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
                    <td className="hidden py-4 md:table-cell">
                      {data.total_volume}
                    </td>
                    <td className="hidden py-4 sm:table-cell">
                      {data.market_cap_change_percentage_24h}%
                    </td>
                    <td
                      className={
                        data.price_change_percentage_1h_in_currency > 0
                          ? "py-4 text-green lg:table-cell hidden"
                          : "py-4 text-red lg:table-cell hidden"
                      }
                    >
                      {Number(
                        data.price_change_percentage_1h_in_currency
                      ).toFixed(2)}
                    </td>
                    <td
                      className={
                        data.price_change_percentage_24h_in_currency > 0
                          ? "py-4 text-green lg:table-cell hidden"
                          : "py-4 text-red lg:table-cell hidden"
                      }
                    >
                      {Number(
                        data.price_change_percentage_24h_in_currency
                      ).toFixed(2)}
                    </td>
                    <td
                      className={
                        data.price_change_percentage_7d_in_currency > 0
                          ? "py-4 text-green lg:table-cell hidden"
                          : "py-4 text-red lg:table-cell hidden"
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
        ) : (
          <div className="flex min-h-[60vh] items-center justify-center w-full h-full">
            <div
              className="w-8 h-8 border-4 rounded-full border-violet border-b-gray-200 animate-spin"
              role="status"
            />
            <span className="ml-2">Loading...</span>
          </div>
        )}
      </div>
      <div className="flex items-center  justify-between mt-4 capitalize h-[2rem]">
        <span>
          Data provided by{" "}
          <a
            href="https://www.coingecko.com"
            rel="noreferrer"
            target={"_blank"}
            className="text-violet"
          >
            CoinGecko
          </a>
        </span>
      </div>
      <Pagination />
    </>
  );
};

export default TableComponent;
