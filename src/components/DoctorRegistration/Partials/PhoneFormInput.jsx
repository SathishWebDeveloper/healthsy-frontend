import React from "react";
import { useEffect } from "react";

// todo remove
export default function PhoneFormInput(props) {
  const {
    otpStatus,
    inputAttrs,
    onInputNumber,
    isDisabled = false,
    children,
    design,
    otpdisable,
    placeholder = "",
    className = ""
  } = props || {};

  const handleOnWheelPreventChange = (e) => {
    e.target.blur();
    e.stopPropagation();
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  return (
    <div
      className={`input-group mobile-verify ${
        design == true ? "mob-mobile-des" : ""
      }`}
    >
      <div className="c-input-group--phn position-relative w-100">
        <input
          type="text"
          {...inputAttrs}
          className={`form-control ${
            otpStatus === undefined ? "" : ""
          } ctaModelPhone ${className}`}
          disabled={isDisabled}
          onChange={onInputNumber}
          placeholder={placeholder}
          onWheel={handleOnWheelPreventChange}
          maxLength="10"
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
        <span className="c-input-group--prefix">91</span>

        {children}
      </div>
    </div>
  );
}
