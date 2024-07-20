import React from "react";

const SimulatorControls = ({ setCount, setPlaying, count, playing }) => {
  return (
    <>
      <div>
        <button onClick={() => setCount(count - 1)}>Prev</button>
        <button onClick={() => setPlaying((prev) => !prev)}>
          {playing ? "Stop" : "Play"}
        </button>
        <button onClick={() => setCount(count + 1)}>Next</button>
      </div>
    </>
  );
};

export default SimulatorControls;
