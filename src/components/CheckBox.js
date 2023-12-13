import React from 'react';

function CheckBox({ dateOrdered, estimated, toggleDetails }) {
    return (
        <div className='orderBox-mar'>
            <div className='productHeading-mar'>order 1</div>
            <div className='orderInfoBox-mar'>
                <div className='dateOrdered'>
                    <div className='orderTitle'>ORDERED</div>
                    <div className='deliveryTime'>{dateOrdered}</div>
                </div>
                <div className='dateOrdered'>
                    <div className='orderTitle'>ESTIMATED DELIVERY</div>
                    <div className='deliveryTime'>{estimated}</div>
                </div>
            </div>
            <button className='seeMore-mar' onClick={toggleDetails}>
                DETAILS
            </button>
            <button className='seeMore-mar'>
                DELIVERED
            </button>
        </div>
    );
}

export default CheckBox;