import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import { numberWithCommas } from "../components/CoinsTable";

const CoinPage = () => {
  const { id } = useParams();
  console.log("All about", id);
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const fetchCoin = async () => {
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {fetchCoin()}, [currency]);

  return (
    <div className="flex text-black">
      <div className="text-center ml-4 mt-8 w-[32vh] flex flex-col items-center" id='marketData'>
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          className="w-28 aspect-square md:w-40 md:h-40 rounded-full mb-5"
        />
        <h1 className="text-3xl font-bold mt-3">{coin?.name}</h1>
        <p className="text-gray-700 text-xl">{coin?.symbol}</p>
        <div>
          <h1 className="flex text-2xl text-left mt-2  font-semibold">
            Rank: {coin?.market_cap_rank}
          </h1>
          <h1 className="flex text-2xl text-left  mt-2 font-semibold">
            Current Price: {symbol}{" "}
            {numberWithCommas(
              coin?.market_data?.current_price[currency.toLowerCase()]
            )}
          </h1>
          <h1 className="flex mt-2 text-2xl text-left font-semibold">
            Market Cap: {symbol}{" "}
            {numberWithCommas(
              coin?.market_data?.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
            )}{" "}
            M
          </h1>
        </div>
      </div>
      <CoinInfo coin= {coin}/>
    </div>
  );
};

export default CoinPage;
