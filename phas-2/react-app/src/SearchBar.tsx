import React from "react";

interface SearchBarProps {
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div id="search-section">
      <input
        type="text"
        id="search-input"
        placeholder="Search products..."
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
