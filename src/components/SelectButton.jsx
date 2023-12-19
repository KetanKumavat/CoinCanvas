import React from 'react'

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={`border-2 border-gold rounded-md p-2 md:p-4 font-montserrat cursor-pointer ${
        selected ? "bg-gold text-black font-bold" : ""
      } hover:bg-gold hover:text-black transition-colors duration-300`}>
      {children}
    </span>
  );
};

export default SelectButton
