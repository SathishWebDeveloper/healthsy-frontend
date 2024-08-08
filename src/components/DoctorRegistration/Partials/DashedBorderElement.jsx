import React from 'react'

export default function DashedBorderElement (props) {
    const { isActive = false, activeColor = 'CB1B5B', inActiveColor = '98969D' } = props || {}

    return (
        <div
            className='d-flex mx-3 flex-fill'
            style={{
                height: '2px',
                backgroundImage: `url("data:image/svg+xml, %3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23${isActive ? activeColor : inActiveColor}' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='2' stroke-linecap='round'/%3e%3c/svg%3e")`
            }}>
        </div>
    )
}
