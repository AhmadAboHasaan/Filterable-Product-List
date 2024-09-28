import React from "react";

interface FilterButtonsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => (
  <div id="filter-section">
    {categories.map((category) => (
      <button
        key={category}
        className={`filter-button ${
          activeCategory === category ? "active" : ""
        }`}
        onClick={() => onCategoryChange(category)}
      >
        {category}
      </button>
    ))}
  </div>
);

export default FilterButtons;
