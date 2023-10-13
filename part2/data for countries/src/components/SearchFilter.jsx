// SearchFilter.js - Component for the search box
const SearchFilter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      Find countries <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

export default SearchFilter;
