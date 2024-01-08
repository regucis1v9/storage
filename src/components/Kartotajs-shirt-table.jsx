import React, { useState, useEffect } from 'react';
import '../css/Kartotajs-Shirt-Table.css';

const KartotajsShirtTable = () => {
    const [shirts, setShirts] = useState([]);

    const fetchData = async () => {
        try {
            // Assuming you have an API endpoint for fetching shirt data
            const response = await fetch('http://localhost:8888/storageAPI/KartotajsDisplayShirts.php');
            const data = await response.json();
            setShirts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array to run effect only once on component mount

    const handleMoveButtonClick = async (shirtId) => {
        try {
            const formData = new FormData();
            formData.append('id', shirtId);

            const response = await fetch('http://localhost:8888/storageAPI/MoveShirt.php', {
                method: 'POST',
                body: formData,
                // No need to specify headers for FormData
            });

            if (response.ok) {
                // Shirt moved successfully, update UI by fetching updated data
                fetchData();
            } else {
                console.error('Error moving shirt');
            }
        } catch (error) {
            console.error('Error moving shirt:', error);
        }
    };


    return (
        <div className="shirt-table-container">
            <div className="shirt-table">
                <div className="table-row header-row">
                    <div className="table-cell">Color</div>
                    <div className="table-cell">Size</div>
                    <div className="table-cell">Type</div>
                    <div className="table-cell">Amount</div>
                    <div className="table-cell">Shelf</div>
                    <div className="table-cell">Actions</div>
                </div>
                {shirts.map((shirt, index) => (
                    <div key={index} className="table-row">
                        <div className="table-cell">{shirt.color}</div>
                        <div className="table-cell">{shirt.size}</div>
                        <div className="table-cell">{shirt.type}</div>
                        <div className="table-cell">{shirt.amount}</div>
                        <div className="table-cell">{shirt.shelf}</div>
                        <div className="table-cell">
                            <button onClick={() => handleMoveButtonClick(shirt.id)}>Move</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KartotajsShirtTable;
