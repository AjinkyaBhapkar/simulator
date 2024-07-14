import React, { useRef, useEffect, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import axios from "axios";
export default () => {
  const chartContainerRef = useRef();
  const chartInstance = useRef(null);
  const [ticker, setTicker] = useState("btcusdt");
  const [inputTicker, setInputTicker] = useState(ticker);
  const [timeFrame, setTimeFrame] = useState("1m");
  const [ohlcData, setOhlcData] = useState([]);
  const [showohlcData, setShowOhlcData] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const get1mCloseData = async () => {
    const { data } = await axios.get(
      `https://fapi.binance.com/fapi/v1/klines?symbol=${ticker}&interval=${timeFrame}&limit=1500`
    );

    const ohlc = data.map((item) => ({
      time: Number(item[0] / 1000),
      open: Number(item[1]),
      high: Number(item[2]),
      low: Number(item[3]),
      close: Number(item[4]),
    }));
    setOhlcData(ohlc);
  };

  useEffect(() => {
    get1mCloseData();
  }, [timeFrame, ticker]);
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
    candleSeries.setData(showohlcData);

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
  }, [ohlcData, ticker, count]);
  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    } else if (!playing && interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [playing]);
  return (
    <>
      <div
        style={{
          width: "800px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <button onClick={() => setTimeFrame("1m")}>1m</button>
          <button onClick={() => setTimeFrame("3m")}>3m</button>
          <button onClick={() => setTimeFrame("5m")}>5m</button>
          <button onClick={() => setTimeFrame("15m")}>15m</button>
          <button onClick={() => setTimeFrame("30m")}>30m</button>
          <button onClick={() => setTimeFrame("1h")}>1h</button>
          <button onClick={() => setTimeFrame("4h")}>4h</button>
          <button onClick={() => setTimeFrame("1d")}>1d</button>
          <button onClick={() => setTimeFrame("1w")}>1w</button>
          <button onClick={() => setTimeFrame("1M")}>1M</button>
        </div>
        <div>
          <input
            value={inputTicker}
            onChange={(e) => setInputTicker(e.target.value)}
          />
          <button onClick={() => setTicker(inputTicker)}>Submit</button>
        </div>
        <div>
          <button onClick={() => setCount(count - 1)}>Prev</button>
          <button onClick={() => setPlaying((prev) => !prev)}>
            {playing ? "Stop" : "Play"}
          </button>
          <button onClick={() => setCount(count + 1)}>Next</button>
        </div>
      </div>

      <div ref={chartContainerRef} style={{ border: "0.5px solid grey" }} />
    </>
  );
};
