// SearchBar.tsx
import React from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearch = () => {
    const searchTerm = (
      document.getElementById("searchInput") as HTMLInputElement
    ).value;
    onSearch(searchTerm);
  };

  return (
    <div
      className="search-bar"
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "100px 100px 30px 100px",
      }}
    >
      <input
        type="text"
        id="searchInput"
        placeholder="Search for jobs..."
        style={{
          width: "500px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxShadow: "10px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        Find jobs
      </button>
    </div>
  );
};

export default SearchBar;
