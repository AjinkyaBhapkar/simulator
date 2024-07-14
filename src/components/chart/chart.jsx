import React, { useRef, useEffect, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import axios from "axios";
export const Chart = ({ ticker, timeFrame }) => {
  const chartContainerRef = useRef();
  const chartInstance = useRef(null);
  const [ohlcData, setOhlcData] = useState([]);
  const [showohlcData, setShowOhlcData] = useState([]);
  const [count, setCount] = useState(0);
  const get1mCloseData = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/users/get-1m-close?exchange=binance&pair=btcusdt"
    );

    const ohlc = data.data.map((d) => {
      let z = d.message.k;
      return {
        time: Number(z.t / 1000),
        open: Number(z.o),
        high: Number(z.h),
        low: Number(z.l),
        close: Number(z.c),
      };
    });
    setOhlcData(ohlc);
  };

  useEffect(() => {
    get1mCloseData();
  }, []);
  useEffect(() => {
    if (!chartInstance || !chartInstance.current) {
      chartInstance.current = createChart(chartContainerRef.current, {
        width: 800,
        height: 400,
        grid: {
          vertLines: {
            color: "rgba(197, 203, 206, 0.7)", // This color can be set to transparent to hide vertical grid lines
            visible: false, // Set to false to hide vertical grid lines
          },
          horzLines: {
            color: "rgba(197, 203, 206, 0.7)", // This color can be set to transparent to hide horizontal grid lines
            visible: false, // Set to false to hide horizontal grid lines
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });
    }

    const candleSeries = chartInstance.current.addCandlestickSeries();
    candleSeries.setData(ohlcData);

    return () => {
      if (chartInstance && chartInstance.current) {
        chartInstance.current.remove();
        chartInstance.current = null;
        // candleSeries.setData([]);
      }
    };
  }, [showohlcData, ticker, timeFrame]);
  useEffect(() => {
    let arrayToShow = ohlcData.slice(0, count);
    setShowOhlcData(arrayToShow);
  }, [ohlcData, count]);
  return (
    <>
      <div ref={chartContainerRef} style={{ width: "100%", height: "100%" }} />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  );
};
