import React, { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import CountryList from "./components/CountryList";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
