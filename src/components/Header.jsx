import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/')
  }
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1" onClick={handleClick}>
          <a className="btn btn-ghost text-3xl text-lime-400">CoinCanvas</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-2xl text-white mr-8">
            <li>
              <details>
                <summary>Currency</summary>
                <ul className="p-2 bg-slate-900 rounded-t-none">
                  <li className="px-9 py-3" value={"USD"}>USD</li>
                  <li className="px-9" value={"INR"}>INR</li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header

