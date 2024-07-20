import React, { useState } from "react";
import TickerSearchModal from "./TickerSearchModal";

const TickerSelection = ({ ticker, setTicker }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="">
        <span onClick={() => setShowModal(true)}>
          {ticker || "Select Symbol"}
        </span>
        {showModal ? (
          <TickerSearchModal
            showModal={showModal}
            setShowModal={setShowModal}
            setTicker={setTicker}
          />
        ) : null}
      </div>
    </>
  );
};

export default TickerSelection;
