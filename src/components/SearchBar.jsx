import React, { useRef, useState } from "react"
import TaskList from "./TaskList"

function SearchBar() {
  const [query, setQuery] = useState("")
  const inputRef = useRef(null)

  function handleSearch(e) {
    setQuery(e.target.value)
  }


  return (
    <div>
      <div className="search-container">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search tasks..."
          value={query}
          onChange={handleSearch}
        />
        </div>
        <TaskList query={query}/>
    </div>
  );
}

export default SearchBar;
