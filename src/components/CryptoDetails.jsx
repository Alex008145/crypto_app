import React, { useContext, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";

const CryptoDetails = () => {
  let { coinId } = useParams();
  let navigate = useNavigate();
  let { getCoinData, coinData: data, currency } = useContext(CryptoContext);

  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId]);

  const close = () => {
    navigate("..");
  };

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 flex items-center justify-center w-full h-full bg-gray-200 backdrop-blur-sm bg-opacity-30 font-nunito"
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
                    <span>Price</span>
                    <div>
                      <span>
                        {Number(
                          data.market_data.price_change_percentage_24h
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                    <h2>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                        maximumSignificantDigits: 5,
                      }).format(data.market_data.current_price[currency])}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[55%] h-full pl-3 bg-green">
              Right
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    document.getElementById("model")
  );
};

export default CryptoDetails;
