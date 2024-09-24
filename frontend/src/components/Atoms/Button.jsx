import React from "react";

const Button = ({ value, type, onClick }) => {
  return (
    <div>
      <button type={type} onClick={onClick}>
        {value}
      </button>
    </div>
  );
};

export default Button;
