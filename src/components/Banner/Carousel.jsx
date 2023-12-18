import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import cryptoDataINR from "../../../data/cryptoDataINR.json";
import cryptoDataUSD from "../../../data/cryptoDataUSD.json";
import { CryptoState } from "../../CryptoContext";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, setCurrency } = CryptoState();

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
    <Link key={crypto.id} className="" to={`/cryptos/${crypto.id}`}>
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
        <span>{crypto.name}</span>
        <span
          className={` ${
            crypto.price_change_percentage_24h < 0
              ? "text-red-700 text-2xl"
              : "text-green-800 text-2xl"
          }`}>
          {crypto.current_price}
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
