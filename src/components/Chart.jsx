import React, { useContext, useLayoutEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CryptoContext } from "../context/CryptoContext";

// Custom tooltip component for the chart
function CustomTooltip({ payload, label, active, currency = "usd" }) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="text-sm label ">{`${label} : ${new Intl.NumberFormat(
          "en-US",
          {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2,
          }
        ).format(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
}

// Chart component that displays the chart
const ChartComponent = ({ data, currency, type }) => {
  return (
    <ResponsiveContainer height={"90%"}>
      <LineChart width={400} height={400} data={data}>
        <CartesianGrid stroke="#323232" />
        <Line
          type="monotone"
          dataKey={type}
          stroke="#6d28d9"
          strokeWidth={"3px"}
        />
        <XAxis dataKey="date" hide />
        <YAxis dataKey={type} hide domain={["auto", "auto"]} />
        <Tooltip
          content={<CustomTooltip />}
          currency={currency}
          cursor={false}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Chart component that fetches and displays the chart data
const Chart = ({ id }) => {
  const [chartData, setChartData] = useState();
  let { currency } = useContext(CryptoContext);
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(7);

  useLayoutEffect(() => {
    // Fetch chart data from the Coingecko API
    const getChartData = async (id) => {
      try {
        const data = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        )
          .then((res) => res.json())
          .then((json) => json);

        console.log("chart-data", data);

        // Convert the fetched data to the format required by the chart component
        let convertedData = data[type].map((item) => {
          return {
            date: new Date(item[0]).toLocaleDateString(),
            [type]: item[1],
          };
        });

        console.log(convertedData);
        setChartData(convertedData);
      } catch (error) {
        console.log(error);
      }
    };
    getChartData(id);
  }, [id, type, days]);

  return (
    // Render the chart component with the fetched data
    <div className="w-full h-[60%]">
      <ChartComponent data={chartData} currency={currency} type={type} />
      <div className="flex">
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 ${
            type === "prices" ? "bg-violet" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("prices")}
        >
          Price
        </button>
        <button
          className="text-sm py-0.5 px-1.5 ml-2"
          onClick={() => setType("market_caps")}
        >
          Market caps
        </button>
        <button
          className="text-sm py-0.5 px-1.5 ml-2"
          onClick={() => setType("total_volumes")}
        >
          Total volumes
        </button>

        <button
          className="text-sm py-0.5 px-1.5 ml-2"
          onClick={() => setDays(7)}
        >
          7 days
        </button>
        <button
          className="text-sm py-0.5 px-1.5 ml-2"
          onClick={() => setDays(14)}
        >
          14 days
        </button>
        <button
          className="text-sm py-0.5 px-1.5 ml-2"
          onClick={() => setDays(30)}
        >
          30 days
        </button>
      </div>
    </div>
  );
};

export default Chart;
