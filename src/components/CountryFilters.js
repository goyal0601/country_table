import React, { useState } from "react";
import "../styles/CountryFilters.css";

const options = [
  { value: 0, label: "Any Population" },
  { value: "1000000", label: "<1M" },
  { value: "5000000", label: "<5M" },
  { value: "10000000", label: "<10M" },
];

const CountryFilters = ({
  countryName,
  population,
  onNameChange,
  onPopulationChange,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onPopulationChange(option.value); // Send selected value to parent component or callback
  };

  const selectedOption = options.find((opt) => opt.value === population);

  return (
    <div className="country-filter">
      <input
        className="country-filter-input"
        type="text"
        value={countryName}
        placeholder="Country Name"
        onChange={(e) => onNameChange(e.target.value)}
      />
      <div className="custom-select" onBlur={() => setIsOpen(false)}>
        <div
          className={`select-selected ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption.label}
        </div>
        {isOpen && (
          <div className="select-items">
            {options.map((option, index) => (
              <div key={index} onClick={() => handleOptionClick(option)}>
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {countryName || population ? (
        <button className="clear-button" onClick={onClear}>
          Clear
        </button>
      ) : null}
    </div>
  );
};

export default CountryFilters;
