import React, { useState, useEffect } from 'react';
import '../css/Kartotajs-Shirt-Table.css';

const KartotajsShirtTable = () => {
    const [shirts, setShirts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assuming you have an API endpoint for fetching shirt data
                const response = await fetch('/api/shirts');
                const data = await response.json();
                setShirts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run effect only once on component mount

    return (
        <div className="shirt-table-container">
            <div className="shirt-table">
                <div className="table-row header-row">
                    <div className="table-cell">Color</div>
                    <div className="table-cell">Size</div>
                    <div className="table-cell">Type</div>
                    <div className="table-cell">Quantity</div>
                </div>
                {shirts.map((shirt, index) => (
                    <div key={index} className="table-row">
                        <div className="table-cell">{shirt.color}</div>
                        <div className="table-cell">{shirt.size}</div>
                        <div className="table-cell">{shirt.type}</div>
                        <div className="table-cell">{shirt.quantity}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KartotajsShirtTable;
