import personService from "../services/persons";

const PersonsList = ({ persons, searchTerm, setPersons }) => {
  const deletePerson = (id) => {
    if (window.confirm("Do you really want to delete this person?")) {
      personService
        .erase(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
        });
    }
  };

  return persons
    .filter((person) =>
      person.name.toUpperCase().includes(searchTerm.toUpperCase())
    )
    .map((person) => (
      <div key={person.name}>
        {person.name} {person.number}{" "}
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </div>
    ));
};
export default PersonsList;
