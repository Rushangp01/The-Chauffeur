import React from 'react';
import 'remixicon/fonts/remixicon.css';

const SearchLoactionPanel = ({ suggestions, setPanelOpen, setPickup, setDestination, activeField }) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.description); // Use the description field
    } else if (activeField === 'destination') {
      setDestination(suggestion.description); // Use the description field
    }
    setPanelOpen(false);
  };

  return (
    <div>
      {/* Display the suggestions */}
      {suggestions.map((elem, idx) => (
        <div
        key={idx}
        className="flex gap-3 items-center p-3 hover:bg-gray-200 cursor-pointer"
        onClick={() => handleSuggestionClick(elem)}
      >
        <i className="ri-map-pin-2-fill"></i>
        <h3 className="text-lg font-medium">{elem.description}</h3> {/* Render the description */}
        </div>
      ))}
    </div>
  );
};

export default SearchLoactionPanel;