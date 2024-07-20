import axios from "axios";
import React, { useEffect, useState } from "react";

const TickerSearchModal = ({ showModal, setShowModal, setTicker }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allResults, setAllResults] = useState([]);
  useEffect(() => {
    const getSymbols = async () => {
      const { data } = await axios.get(
        `https://fapi.binance.com/fapi/v2/ticker/price`
      );
      const symbols = data.map((a) => a.symbol);
      const default_results = symbols.slice(0, 10);
      setAllResults(symbols);
      setResults(default_results);
    };
    getSymbols();
  }, [showModal]);
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    // Simulating a search by filtering a static array

    const filteredResults = allResults.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    filteredResults.splice(10);
    setResults(filteredResults);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-white bg-opacity-25 backdrop-blur-sm"></div>
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 z-10">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>
        <h2 className="text-l font-bold mb-4">Search Symbol</h2>
        <div className="p-4 max-w-md mx-auto">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search..."
          />
          <ul className="mt-4">
            {results.map((result, index) => (
              <li
                key={index}
                className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100"
                onClick={() => {
                  setTicker(result);
                  setShowModal(false);
                }}
              >
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TickerSearchModal;
