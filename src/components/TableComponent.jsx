import React, { useContext } from "react";

import { CryptoContext } from "../context/CryptoContext";
import { CiStar } from "react-icons/ci";

const TableComponent = () => {
  let { cryptoData } = useContext(CryptoContext);

  return (
    <div className="flex flex-col border border-gray-100 rounded-lg mt-9">
      {cryptoData ? (
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
            {cryptoData.map((data) => {
              return (
                <tr
                  key={data.id}
                  className="text-base text-center border-b border-gray-100 hover:bg-gray-200 last:border-b-0"
                >
                  <td className="flex items-center py-4 uppercase">
                    <button className="border-0 cursor-pointer outline-0 bg-none">
                      <CiStar className="w-[1.5rem] h-[1.5rem] ml-1.5 fill-gray-100 hover:fill-cyan" />
                    </button>
                    <img
                      src={data.image}
                      alt={data.name}
                      className="w-[2rem] h-[2rem] mx-1.5"
                    />
                    <span>{data.symbol}</span>
                  </td>
                  <td className="py-4">{data.name}</td>
                  <td className="py-4">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
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
      ) : null}
    </div>
  );
};

export default TableComponent;
