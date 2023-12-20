import React from 'react'

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={`border-2 p-4 m-1 text-center font-semibold border-black rounded-md flex gap-4 md:p-2 font-montserrat cursor-pointer ${
        selected ? "bg-black text-white font-bold" : ""
      } hover:scale-75 transition-colors duration-1000`}>
      {children}
    </span>
  );
};

export default SelectButton
