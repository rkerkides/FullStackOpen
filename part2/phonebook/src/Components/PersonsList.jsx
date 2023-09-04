import personService from "../services/persons";

const PersonsList = ({
  persons,
  searchTerm,
  setPersons,
  setNotificationMSG,
  setIsSuccessful,
}) => {
  const deletePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      personService
        .erase(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotificationMSG(`${name} successfully deleted!`);
          setIsSuccessful(true);
          setTimeout(() => {
            setNotificationMSG(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          setNotificationMSG(`Error deleting ${name}!`);
          setIsSuccessful(false);
          setTimeout(() => {
            setNotificationMSG(null);
          }, 5000);
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
        <button onClick={() => deletePerson(person.id, person.name)}>
          delete
        </button>
      </div>
    ));
};

export default PersonsList;
