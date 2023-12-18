import React, { useEffect, useState } from "react";
import { CoinList } from "./../config/api";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency } = CryptoState();
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  console.log(coins);
  useEffect(() => {
    fetchCoins();
  }, [currency]);
  return (
    <div className="text-black">
      <h1 className="text-2xl m-16 text-center">
        CryptoCurrency Prices by Market Cap
      </h1>
      <input
        type="search"
        placeholder="Search"
        className="input input-bordered bg-black text-white mb-16 flex fle-wrap w-1/2 mx-auto rounded-2xl"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {loading ? (
          <div>
            <LinearProgress style={{backgroundColor: "black"}}/>
          </div>
        ) : (
          <div>
            <h1>hello</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinsTable;
