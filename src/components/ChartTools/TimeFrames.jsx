import React from "react";

const TimeFrames = ({ setTimeFrame }) => {
  return (
    <>
      <div>
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => setTimeFrame("1m")}
        >
          1m
        </button>
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => setTimeFrame("3m")}
        >
          3m
        </button>
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => setTimeFrame("5m")}
        >
          5m
        </button>
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => setTimeFrame("5m")}
        >
          5m
        </button>
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => setTimeFrame("15m")}
        >
          15m
        </button>
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => setTimeFrame("5m")}
        >
          5m
        </button>
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => setTimeFrame("30m")}
        >
          30m
        </button>
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => setTimeFrame("1h")}
        >
          1h
        </button>
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => setTimeFrame("4h")}
        >
          4h
        </button>
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => setTimeFrame("1d")}
        >
          1d
        </button>
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => setTimeFrame("1w")}
        >
          1w
        </button>
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => setTimeFrame("1M")}
        >
          1M
        </button>
      </div>
    </>
  );
};

export default TimeFrames;
