import React from "react";
import ChartComponenet from "../../components/chart/chart";
const Chart = () => {
  return (
    <>
      <h2>Chart</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ChartComponenet />
      </div>
    </>
  );
};

export default Chart;
