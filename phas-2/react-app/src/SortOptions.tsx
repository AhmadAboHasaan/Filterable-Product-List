import React from "react";

interface SortOptionsProps {
  onSortChange: (criteria: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSortChange }) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <div id="sort-section">
      <select id="sort" onChange={handleSelectChange}>
        <option value="">Sort By: None</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>
    </div>
  );
};

export default SortOptions;
