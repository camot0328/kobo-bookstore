import React from "react";

function SearchBar({ query, setQuery, handleSearch }) {
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
        style={{ padding: "10px", width: "300px" }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: "10px 20px", marginLeft: "10px" }}
      >
        검색
      </button>
    </div>
  );
}

export default SearchBar;
