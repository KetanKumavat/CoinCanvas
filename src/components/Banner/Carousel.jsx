import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
// import coinDataINR from "../../../data/coinDataINR.json";
// import coinDataUSD from "../../../data/coinDataUSD.json";
import { CryptoState } from "../../CryptoContext";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { numberWithCommas } from "../CoinsTable";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const navigate = useNavigate();

  // useEffect(() => {
  //   // Use either coinDataINR or coinDataUSD based on your currency context
  //   const selectedData = currency === "INR" ? coinDataINR : coinDataUSD;
  //   setTrending(selectedData.slice(0, 8)); // Display the first 5 trending coins
  // }, [currency]);

  // useEffect(() => {
  //   console.log("Currency changed:", currency);
  //   const selectedData = currency === "INR" ? coinDataINR : coinDataUSD;
  //   setTrending(selectedData.slice(0, 8));
  // }, [currency]);

    const fetchTrendingCoins = async () => {
      const { data } = await axios.get(TrendingCoins(currency));
      console.log(data);
      setTrending(data);
    };
      useEffect(() => {
        fetchTrendingCoins();
      }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
    <Link key={coin.id} className="text-xl text-black">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <img
          src={coin.image}
          alt={coin.name}
          className="h-28 object-cover mt-8"
          style={{ marginBottom: 10 }}
          onClick={() => {
            navigate(`/coins/${coin.id}`);
          }}
        />
        <span className="font-medium">{coin.name}</span>
        <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        <span className="font-bold">
          {symbol} {numberWithCommas(coin.current_price)}
        </span>
      </div>
    </Link>

  );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="flex items-center">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;