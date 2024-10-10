import React from "react";
import spinner_green from "../../assets/spinner_green.svg";
import spinner_pink from "../../assets/spinner_red.svg";

function Button({
  label,
  onClick,
  className,
  variant,
  isDisabled,
  showSpinner,
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`border rounded-full px-7 py-2 cursor-pointer ${
        variant === "pink"
          ? "border-pink-300 text-pink-300"
          : "border-green-300 text-green-300"
      } ${isDisabled ? "opacity-40" : ""}`}
    >
      {showSpinner ? (
        <img
          src={variant === "pink" ? spinner_pink : spinner_green}
          alt="spinner"
          className="h-5 w-5"
        />
      ) : (
        label
      )}
    </button>
  );
}

export default Button;
