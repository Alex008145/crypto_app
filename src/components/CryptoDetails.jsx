import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";
import {
  FaArrowDown,
  FaArrowUp,
  FaFacebookSquare,
  FaGithub,
  FaReddit,
  FaTelegram,
} from "react-icons/fa";
import Chart from "./Chart";
import { FaSquareXTwitter } from "react-icons/fa6";

/**
 * HighLowIndicator component
 *
 * This component takes in current price, high price and low price and renders a
 * bar that shows the green zone (the zone where the current price is higher than
 * the low price) and the red zone (the zone where the current price is lower than
 * the high price).
 *
 * The width of the green zone is calculated based on the difference between the
 * current price and the low price, and the width of the red zone is calculated
 * based on the difference between the high price and the current price.
 *
 * The component is updated when the current price, high price or low price
 * changes.
 */
const HighLowIndicator = ({ currentPrice, high, low }) => {
  const [green, setGreen] = useState();

  useEffect(() => {
    // Calculate the width of the green zone
    let total = high - low;
    let greenZone = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone));
  }, [currentPrice, high, low]);

  return (
    <>
      {/* Red zone */}
      <span
        className="bg-red h-1.5 rounded-l-lg w-[50%]"
        style={{ width: `${100 - green}%` }}
      >
        &nbsp;
      </span>

      {/* Green zone */}
      <span
        className="bg-green h-1.5 rounded-r-lg w-[50%]"
        style={{ width: `${green}%` }}
      >
        &nbsp;
      </span>
    </>
  );
};

/**
 * CryptoDetails component displays detailed information about a cryptocurrency.
 * It fetches the data using the CryptoContext and displays it in a modal.
 */
const CryptoDetails = () => {
  let { coinId } = useParams();
  let navigate = useNavigate();
  let { getCoinData, coinData: data, currency } = useContext(CryptoContext);

  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId]);

  /**
   * This function is called when the user wants to close the details modal.
   * It uses the `navigate` function from `react-router-dom` to navigate to the parent route.
   */
  const close = () => {
    navigate(".."); // Navigates to the parent route
  };

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 flex items-center justify-center w-full h-full bg-gray-200 backdrop-blur-sm bg-opacity-30 font-nunito "
      onClick={close}
    >
      <div
        className="w-[65%] h-[75%] bg-gray-300 bg-opacity-75 rounded-lg text-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        {data ? (
          <div className="flex items-center justify-between w-full h-full p-4">
            <div className="flex flex-col w-[45%] h-full pr-2">
              <div className="flex items-center w-full">
                <img
                  className="w-[3rem] h-[3rem] mx-1.5"
                  src={data.image.large}
                  alt={data.id}
                />
                <h1 className="text-xl font-medium capitalize">{data.name}</h1>
                <span className="text-sm py-0.5 px-2.5 ml-2 bg-violet text-violet bg-opacity-25 rounded-xl uppercase">
                  {data.symbol}
                </span>
              </div>

              <div className="flex w-full mt-6">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-100 capitalize">
                      Price
                    </span>
                    <div
                      className={`flex items-center px-1 ml-2 text-sm font-medium uppercase bg-opacity-25 rounded-xl
                     ${
                       data.market_data.price_change_percentage_24h > 0
                         ? "bg-green text-green"
                         : "bg-red text-red"
                     }`}
                    >
                      <FaArrowUp
                        className={`w-4 h-4 mr-1 
                        ${
                          data.market_data.price_change_percentage_24h > 0
                            ? "fill-green"
                            : "fill-red rotate-180"
                        }
                        `}
                      />
                      <span>
                        {Number(
                          data.market_data.price_change_percentage_24h
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      maximumSignificantDigits: 5,
                    }).format(data.market_data.current_price[currency])}
                  </h2>
                </div>
              </div>

              <div className="flex justify-between w-full mt-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-100 capitalize">
                    Market Cap
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.market_cap[currency])}
                  </h2>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-100 capitalize">
                    Fully Diluted Valuation
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      notation: "compact",
                    }).format(
                      data.market_data.fully_diluted_valuation[currency]
                    )}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col justify-between w-full mt-4">
                <span className="text-sm text-gray-100 capitalize">
                  Total volume
                </span>
                <h2 className="text-base font-bold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                    minimumFractionDigits: 0,
                  }).format(data.market_data.total_volume[currency])}
                </h2>
              </div>

              <div className="flex justify-between w-full mt-4">
                <HighLowIndicator
                  currentPrice={data.market_data.current_price[currency]}
                  high={data.market_data.high_24h[currency]}
                  low={data.market_data.low_24h[currency]}
                />
              </div>

              <div className="flex justify-between w-full mt-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-100 capitalize">
                    Low 24H
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(data.market_data.low_24h[currency])}
                  </h2>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-100 capitalize">
                    high 24H
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(data.market_data.high_24h[currency])}
                  </h2>
                </div>
              </div>

              <div className="flex justify-between w-full mt-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-100 capitalize">
                    max supply
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.max_supply)}
                  </h2>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-100 capitalize">
                    circulating supply
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.circulating_supply)}
                  </h2>
                </div>
              </div>

              <div className="flex justify-between w-full mt-4">
                <div className="flex flex-col">
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-gray-100 bg-gray-200 px-1.5 py-0.5 my-1 rounded-xl hover:scale-125 ease-in-out duration-300 hover:text-violet"
                    href={data?.links?.homepage[0]}
                  >
                    {data?.links?.homepage[0].substring(8, 30)}
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-gray-100 bg-gray-200 px-1.5 py-0.5 my-1 rounded-xl hover:scale-125 ease-in-out duration-300 hover:text-violet"
                    href={data?.links?.blockchain_site[0]}
                  >
                    {data?.links?.blockchain_site[0].substring(8, 30)}
                  </a>

                  {data?.links?.official_forum_url[0] && (
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-gray-100 bg-gray-200 px-1.5 py-0.5 my-1 rounded-xl hover:scale-125 ease-in-out duration-300 hover:text-violet"
                      href={data?.links?.official_forum_url[0]}
                    >
                      {data?.links?.official_forum_url[0].substring(8, 30)}
                    </a>
                  )}
                </div>

                <div className="flex flex-col content-start">
                  <span className="ml-2 text-sm text-gray-100 capitalize">
                    sentiment
                  </span>
                  <div className="flex justify-between">
                    <div
                      className={`flex items-center px-1 ml-2 my-1 text-sm font-medium uppercase bg-opacity-25 rounded-xl bg-green text-green`}
                    >
                      <FaArrowUp className="w-4 h-4 mr-1" />
                      <span>
                        {Number(data.sentiment_votes_up_percentage).toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div
                      className={`flex items-center px-1 ml-2 my-1 text-sm font-medium uppercase bg-opacity-25 rounded-xl bg-red text-red`}
                    >
                      <FaArrowDown className="w-4 h-4 mr-1" />
                      <span>
                        {Number(data.sentiment_votes_down_percentage).toFixed(
                          2
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:flex-col w-[55%] h-full pl-3 hidden md:flex">
              <Chart id={data.id} />

              <div className="flex flex-col mt-4">
                <h3 className="py-1 text-white capitalize">
                  <span className="mr-1 text-gray-100 capitalize">
                    market cap rank:{" "}
                  </span>
                  {data.market_cap_rank}
                </h3>
                <h3 className="py-1 text-white capitalize">
                  <span className="mr-1 text-gray-100 capitalize">
                    coinGecko rank:{" "}
                  </span>
                  {data.market_cap_rank}
                </h3>
              </div>
            </div>

            <div className="absolute flex items-center bottom-8 right-8">
              {data.links.repos_url.github[0] && (
                <a
                  href={data.links.repos_url.github[0]}
                  className="px-2 text-lg"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaGithub className="w-10 h-10 duration-300 ease-in-out hover:scale-125 hover:text-violet" />
                </a>
              )}

              {data?.links?.twitter_screen_name && (
                <a
                  href={`https://twitter.com/${data?.links?.twitter_screen_name}`}
                  className="px-2 text-lg"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaSquareXTwitter className="w-10 h-10 duration-300 ease-in-out hover:scale-125 hover:text-violet" />
                </a>
              )}
              {data.links.subreddit_url && (
                <a
                  href={data.links.subreddit_url}
                  className="px-2 text-lg"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaReddit className="w-10 h-10 duration-300 ease-in-out hover:scale-125 hover:text-violet" />
                </a>
              )}

              {data.links.facebook_username && (
                <a
                  href={`https://facebook.com/${data.links.facebook_username}`}
                  className="px-2 text-lg"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaFacebookSquare className="w-10 h-10 duration-300 ease-in-out hover:scale-125 hover:text-violet" />
                </a>
              )}

              {data.links.telegram_channel_identifier && (
                <a
                  href={`https://t.me/${data.links.telegram_channel_identifier}`}
                  className="px-2 text-lg"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaTelegram className="w-10 h-10 duration-300 ease-in-out hover:scale-125 hover:text-violet" />
                </a>
              )}
            </div>
          </div>
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
    </div>,
    document.getElementById("model")
  );
};

export default CryptoDetails;
