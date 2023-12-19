import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const { currency, setCurrency } = CryptoState();

  return (
    <div className="flex cursor-default justify-center w-full sm:justify-center">
      <div className="navbar w-[100vh] bg-black border-slate-950 border rounded-full border-3 flex justify-between items-center p-5 mt-4 cursor-pointer">
        <div onClick={handleClick}>
          <a className="btn mb-2 btn-ghost text-4xl">
            CoinCanvas
          </a>
        </div>
        <div className="flex items-center">
          <select
            className="select select-bordered text-white border-white border-2 rounded-xl text-xl"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}>
            <option disabled selected className="text-white">
              Currency
            </option>
            <option value={"USD"}>USD</option>
            <option value={"INR"}>INR</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
