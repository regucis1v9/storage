import React, { useState } from 'react';
import "../css/kartotajs-shirt-search.css";

const KartotajsShirtSearch = ({ shirts, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        const filteredShirts = shirts.filter(
            (shirt) =>
                shirt.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
                shirt.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
                shirt.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                shirt.quantity.toString().includes(searchQuery)
        );

        onSearch(filteredShirts);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search shirts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default KartotajsShirtSearch;
