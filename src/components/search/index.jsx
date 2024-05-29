export default function Search({ search, setSearch, handleSearch }) {
  return (
    <div className="search-engine">
      <input
        type="text"
        placeholder="Enter City Name"
        name="search"
        // receive from parent component weather as prop
        // value={""} this works!
        // value={search} this is what is taught...
        // value={Search} this also works...
        value={search}
        // receive from parent component weather as prop
        onChange={(event) => setSearch(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
