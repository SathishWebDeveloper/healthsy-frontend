import React from 'react'

export default function PhoneFormInputNew (props) {
    const { otpStatus, inputAttrs, onInputNumber, isDisabled = false, children, design, otpdisable } = props || {}

    const handleOnWheelPreventChange = (e) => {
        e.target.blur()
        e.stopPropagation()
        setTimeout(() => {
          e.target.focus()
        }, 0)
    }

    return (
        <div className={`input-group mobile-verify`}>
            <div className="c-input-group--phn position-relative w-100">
                <input
                    type="text"
                    {...inputAttrs}
                    className={`form-control ${otpStatus === undefined ? "": ""}`}
                    disabled={isDisabled}
                    onChange={onInputNumber}
                    placeholder="Enter your mobile number"
                    onWheel={handleOnWheelPreventChange}
                    maxLength="10"
                    onKeyPress={(e)=>{
                        if(!/[0-9]/.test(e.key)){
                            e.preventDefault();
                        }
                    }}
                />
                <span className="c-input-group--prefix">91</span>
                {children}
            </div>
        </div>
    )
}
