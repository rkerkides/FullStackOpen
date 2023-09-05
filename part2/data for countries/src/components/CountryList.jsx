import React, { useState, useEffect } from "react";
import countryAPI from "../services/countries";
import Weather from "./Weather";

const CountryList = ({ searchTerm }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryAPI.getAll().then((countriesList) => setCountries(countriesList));
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
    if (countryToShow) setSelectedCountry(countryToShow);
  };

  const renderCountryDetails = (country) => (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} square kilometers</p>
      <p>Languages:</p>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
      <Weather capital={country.capital[0]} />
    </div>
  );

  return (
    <div>
      {filteredCountries.length === 0 && <p>No matches found.</p>}
      {filteredCountries.length > 10 && (
        <p>Too many matches, please be more specific.</p>
      )}
      {filteredCountries.length > 1 &&
        filteredCountries.length <= 10 &&
        filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => showCountry(country.name.common)}>
              show
            </button>
          </div>
        ))}
      {filteredCountries.length === 1 &&
        renderCountryDetails(filteredCountries[0])}
      {selectedCountry &&
        filteredCountries.length > 1 &&
        filteredCountries.length < 10 &&
        renderCountryDetails(selectedCountry)}
    </div>
  );
};

export default CountryList;
