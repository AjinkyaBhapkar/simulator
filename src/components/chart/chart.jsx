import React, { useRef, useEffect, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import axios from "axios";
import TimeFrames from "../ChartTools/TimeFrames";
import TickerSelection from "../ChartTools/TickerSelection";
import SimulatorControls from "../ChartTools/SimulatorControls";
export default () => {
  const chartContainerRef = useRef();
  const chartInstance = useRef(null);
  const [ticker, setTicker] = useState("BTCUSDT");
  const [inputTicker, setInputTicker] = useState(ticker);
  const [timeFrame, setTimeFrame] = useState("1m");
  const [ohlcData, setOhlcData] = useState([]);
  const [showohlcData, setShowOhlcData] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const get1mCloseData = async () => {
    try {
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
    } catch (e) {
      return <alert>error;</alert>;
    }
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
        <TickerSelection ticker={ticker} setTicker={setTicker} />
        <TimeFrames setTimeFrame={setTimeFrame} />

        <SimulatorControls
          setCount={setCount}
          setPlaying={setPlaying}
          count={count}
          playing={playing}
        />
      </div>

      <div ref={chartContainerRef} style={{ border: "0.5px solid grey" }} />
    </>
  );
};
