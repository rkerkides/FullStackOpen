import React, { useState, useEffect } from "react";
import countryAPI from "../services/countries";

const CountryList = ({ searchTerm }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null); // Track the selected country

  useEffect(() => {
    countryAPI.getAll().then((countriesList) => {
      setCountries(countriesList);
    });
  }, []);

  useEffect(() => {
    const newFilteredCountries = countries.filter((country) =>
      country.name.common.toUpperCase().includes(searchTerm.toUpperCase())
    );
    setFilteredCountries(newFilteredCountries);
  }, [searchTerm, countries]);

  const showCountry = (name) => {
    const countryToShow = filteredCountries.find(
      (country) => country.name.common === name
    );

    if (countryToShow) {
      setSelectedCountry(countryToShow);
    }
  };

  const renderSelectedCountry = () => {
    if (
      selectedCountry &&
      filteredCountries.length > 1 &&
      filteredCountries.length < 10
    ) {
      return (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital[0]}</p>
          <p>Area: {selectedCountry.area} square kilometers</p>
          <p>Languages:</p>
          <ul>
            {Object.values(selectedCountry.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img
            src={selectedCountry.flags.svg}
            alt={`Flag of ${selectedCountry.name.common}`}
            width="150"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, please be more specific.</p>
      ) : filteredCountries.length > 1 ? (
        filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => showCountry(country.name.common)}>
              show
            </button>
          </div>
        ))
      ) : filteredCountries.length === 1 ? (
        <div>
          <h2>{filteredCountries[0].name.common}</h2>
          <p>Capital: {filteredCountries[0].capital[0]}</p>
          <p>Area: {filteredCountries[0].area} square kilometers</p>
          <p>Languages:</p>
          <ul>
            {Object.values(filteredCountries[0].languages).map(
              (language, index) => (
                <li key={index}>{language}</li>
              )
            )}
          </ul>
          <img
            src={filteredCountries[0].flags.svg}
            alt={`Flag of ${filteredCountries[0].name.common}`}
            width="150"
          />
        </div>
      ) : (
        <p>No matches found.</p>
      )}
      {renderSelectedCountry()}
    </div>
  );
};

export default CountryList;
