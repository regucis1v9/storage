import React from 'react';

function OrderedBox({ dateArrived, toggleDetails }) {
    return (
        <div className='orderBox2-mar'>
            <div className='productHeading-mar'>order 1</div>
            <div className='orderInfoBox2-mar'>
                <div className='dateOrdered2'>
                    <div className='orderTitle'>DATE ARRIVED</div>
                    <div className='deliveryTime'>{dateArrived}</div>
                </div>
            </div>
            <button className='seeMore-mar2' onClick={toggleDetails}>
                DETAILS
            </button>
        </div>
    );
}

export default OrderedBox;