import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/')
  }

  const {currency,setCurrency } = CryptoState();
  return (
    <div>
      <div className="navbar bg-base-100 border-slate-950 border rounded-full border-3 flex justify-center p-5 mt-5 w-full cursor-pointer">
        <div className="flex-1" onClick={handleClick}>
          <a className="btn btn-ghost text-5xl text-lime-400 :hover rounded-full :hover btn-wide">
            CoinCanvas
          </a>
        </div>
        <select className="select select-bordered mr-12 text-white rounded-full text-xl" value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option disabled selected className='text-white'>
            Currency
          </option>
          <option value={'USD'}>USD</option>
          <option value={'INR'}>INR</option>
        </select>
      </div>
    </div>
  );
}

export default Header

