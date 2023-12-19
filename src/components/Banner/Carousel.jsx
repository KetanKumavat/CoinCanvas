import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import cryptoDataINR from "../../../data/cryptoDataINR.json";
import cryptoDataUSD from "../../../data/cryptoDataUSD.json";
import { CryptoState } from "../../CryptoContext";

  export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();


  useEffect(() => {
    // Use either cryptoDataINR or cryptoDataUSD based on your currency context
    const selectedData = currency === "INR" ? cryptoDataINR : cryptoDataUSD;
    setTrending(selectedData.slice(0, 8)); // Display the first 5 trending coins
  }, [currency]);

  useEffect(() => {
    console.log("Currency changed:", currency);
    const selectedData = currency === "INR" ? cryptoDataINR : cryptoDataUSD;
    setTrending(selectedData.slice(0, 8));
  }, [currency]);

  const items = trending.map((crypto) => (
    <Link key={crypto.id} className="text-xl text-black">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <img
          src={crypto.image}
          alt={crypto.name}
          className="h-28 object-cover mt-8"
          style={{ marginBottom: 10 }}
        />
        <span className="font-medium">{crypto.name}</span>
        <span
          className={` ${
            crypto.price_change_percentage_24h < 0
              ? "text-red-600 text-xl font-bold"
              : "text-green-800 text-xl"
          }`}>
          {crypto.price_change_percentage_24h.toFixed(2)}%{" "}
        </span>
        <span className="font-bold">
          {symbol} {numberWithCommas(crypto.current_price)}
        </span>
      </div>
    </Link>
  ));

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
