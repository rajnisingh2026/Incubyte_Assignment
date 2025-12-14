import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...searchParams, [name]: value };
    setSearchParams(newParams);
    onSearch(newParams); // Real-time search
  };

  const handleClear = () => {
    const clearedParams = {
      name: '',
      category: '',
      minPrice: '',
      maxPrice: ''
    };
    setSearchParams(clearedParams);
    onSearch(clearedParams);
  };

  return (
    <div className="search-bar">
      <div className="search-inputs">
        <input
          type="text"
          name="name"
          placeholder="Search by name..."
          value={searchParams.name}
          onChange={handleChange}
          className="search-input"
        />
        <input
          type="text"
          name="category"
          placeholder="Category..."
          value={searchParams.category}
          onChange={handleChange}
          className="search-input"
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min price"
          value={searchParams.minPrice}
          onChange={handleChange}
          className="search-input price-input"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max price"
          value={searchParams.maxPrice}
          onChange={handleChange}
          className="search-input price-input"
        />
        <button onClick={handleClear} className="btn-clear">
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
