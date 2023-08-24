const PersonsList = ({ persons, searchTerm }) => {
  return persons
    .filter((person) =>
      person.name.toUpperCase().includes(searchTerm.toUpperCase())
    )
    .map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));
};
export default PersonsList;
