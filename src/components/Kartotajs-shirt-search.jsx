import React, { useState, useEffect } from 'react';
import "../css/kartotajs-shirt-search.css";

const KartotajsShirtSearch = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredShirts, setFilteredShirts] = useState([]);
    const [selectedShirts, setSelectedShirts] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch('http://localhost:8888/storageAPI/ShirtSearch.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    searchQuery: searchQuery,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setFilteredShirts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSelectShirt = (shirt) => {
        setSelectedShirts((prevSelectedShirts) => [...prevSelectedShirts, shirt]);
    };

    const handleSellShirts = async () => {
        if (selectedShirts.length > 0) {
            try {
                const response = await fetch('http://localhost:8888/storageAPI/SellShirts.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedShirts),
                });

                if (!response.ok) {
                    throw new Error('Failed to sell shirts');
                }

                const result = await response.json();
                console.log(result); // Log the server response (success, message, etc.)
            } catch (error) {
                console.error('Error selling shirts:', error);
            }
        } else {
            console.warn('No shirts selected for sale');
        }

        // Clear the selected shirts after selling
        setSelectedShirts([]);
    };


    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    return (
        <div className="search-bar">
            <div>
                <input
                    type="text"
                    placeholder="Search shirts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Display real-time search results */}
            <div className="search-results">
                {filteredShirts.map((shirt) => (
                    <div key={shirt.id} className="result-item">
                        {shirt.color}, {shirt.size}, {shirt.type}, {shirt.amount}
                        <button onClick={() => handleSelectShirt(shirt)}>Select</button>
                    </div>
                ))}
            </div>

            {/* Display selected shirts */}
            <div className="selected-shirts">
                <h2>Selected Shirts</h2>
                <ul>
                    {selectedShirts.map((shirt) => (
                        <li key={shirt.id}>
                            {shirt.color}, {shirt.size}, {shirt.type}, {shirt.amount}
                        </li>
                    ))}
                </ul>
                <button onClick={handleSellShirts}>Sell Selected Shirts</button>
            </div>
        </div>
    );
};

export default KartotajsShirtSearch;
