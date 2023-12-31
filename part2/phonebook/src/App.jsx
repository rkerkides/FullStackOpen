import React, { useState, useEffect } from "react";
import SearchFilter from "./Components/SearchFilter";
import PersonForm from "./Components/PersonForm";
import PersonsList from "./Components/PersonsList";
import personService from "./services/persons";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMSG, setNotificationMSG] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(true);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Do you want to update the number?`
      );
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
            setNotificationMSG("Number successfully updated!");
            setIsSuccessful(true);
            setTimeout(() => {
              setNotificationMSG(null);
            }, 5000);
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            setNotificationMSG(`Error updating ${newName}!`);
            setIsSuccessful(false);
            setTimeout(() => {
              setNotificationMSG(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotificationMSG(`${newName}'s number successfully added!`);
          setIsSuccessful(true);
          setTimeout(() => {
            setNotificationMSG(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error adding person:", error);
          setNotificationMSG(`Error adding ${newName}!`);
          setIsSuccessful(false);
          setTimeout(() => {
            setNotificationMSG(null);
          }, 5000);
        });
    }
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
      <Notification message={notificationMSG} isSuccessful={isSuccessful} />
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
        setNotificationMSG={setNotificationMSG}
        setIsSuccessful={setIsSuccessful}
      />
    </div>
  );
};

export default App;
