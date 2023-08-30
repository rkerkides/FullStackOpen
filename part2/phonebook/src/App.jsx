import { useState, useEffect } from "react";
import axios from "axios";
import SearchFilter from "./Components/SearchFilter";
import PersonForm from "./Components/PersonForm";
import PersonsList from "./Components/PersonsList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const checkDuplicate = (nameToCheck) => {
    const upperCaseName = nameToCheck.toUpperCase();
    return persons.some(
      (person) => person.name.toUpperCase() === upperCaseName
    );
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (checkDuplicate(newName)) {
      alert(`${newName} is already added to the phonebook.`);
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    axios.post("http://localhost:3001/persons", newPerson).then((response) => {
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchFilter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <h2>Add new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonsList persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
