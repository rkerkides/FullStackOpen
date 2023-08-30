import { useState, useEffect } from "react";
import SearchFilter from "./Components/SearchFilter";
import PersonForm from "./Components/PersonForm";
import PersonsList from "./Components/PersonsList";
import personService from "./services/persons";

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

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
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
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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
      <PersonsList
        persons={persons}
        searchTerm={searchTerm}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
