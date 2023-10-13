import React, { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import CountryList from "./components/CountryList";

// App.js - Root component of the application
const App = () => {
  // State for storing search term
  const [searchTerm, setSearchTerm] = useState("");
  // Function to handle changes in search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <SearchFilter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <CountryList searchTerm={searchTerm} />
    </div>
  );
};

export default App;
