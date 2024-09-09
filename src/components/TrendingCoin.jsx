import React from "react";
import { useNavigate } from "react-router-dom";

const TrendingCoin = ({ data }) => {
  let navigate = useNavigate();

  const getCoinDetails = (id) => {
    navigate(`${id}`);
  };

  return (
    <div
      className="w-[40%]  mb-12 last:mb-0 rounded-xl p-4 relative cursor-pointer border border-violet hover:scale-110 ease-in-out duration-300"
      onClick={() => getCoinDetails(data.id)}
    >
      {data ? (
        <>
          <h3 className="text-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize">name: &nbsp;</span>
            <span className="text-white">{data.name}</span>
            <img
              src={data.small}
              alt={data.name}
              className="w-[1.5rem] h-[1.5rem] mx-1.5 rounded-full"
            />
          </h3>
          <h3 className="text-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize">
              market cap rank: &nbsp;
            </span>
            <span className="text-white">{data.market_cap_rank}</span>
          </h3>
          <h3 className="text-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize">
              price in btc: &nbsp;
            </span>
            <span className="text-white">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "btc",
                maximumSignificantDigits: 5,
              }).format(data.price_btc)}
            </span>
          </h3>
          <h3 className="text-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize">score: &nbsp;</span>
            <span className="text-white">{data.score + 1}</span>
          </h3>
          <img
            src={data.large}
            alt={data.name}
            className="w-[25%] h-auto p-1 rounded-full absolute top-[50%] right-5 translate-y-[-50%]"
          />
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div
            className="w-8 h-8 border-4 rounded-full border-violet border-b-gray-200 animate-spin"
            role="status"
          />
          <span className="ml-2">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default TrendingCoin;
