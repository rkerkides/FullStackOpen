import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const PersonsList = () => {
    return persons.map((person) => <p key={person.name}>{person.name}</p>);
  };

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

    const newPerson = { name: newName };
    setPersons([...persons, newPerson]);
    setNewName("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonsList />
    </div>
  );
};

export default App;
