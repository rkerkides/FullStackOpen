import React, { useState, useEffect } from "react";
import countryAPI from "../services/countries";

const CountryList = ({ searchTerm }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

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

  return (
    <div>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, please be more specific.</p>
      ) : filteredCountries.length > 1 ? (
        filteredCountries.map((country) => (
          <div key={country.name.common}>{country.name.common}</div>
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
    </div>
  );
};

export default CountryList;
