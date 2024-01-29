import React, { useState } from "react";


function BookList() {
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle changes in the search input
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
        </div>
    );
}

export default BookList;
