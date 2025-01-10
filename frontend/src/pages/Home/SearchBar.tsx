import React, { useState, useEffect } from "react";
import axiosInstance from "../../common/axiosInstance"; // Ensure axiosInstance is correctly configured
import { IJob } from "../../interfaces/interfaces";
import { IJobCard } from "../../interfaces/job";
import SearchFilters from "./SearchFilters";

interface SearchBarProps {
  onSearch: (searchedJobs: IJobCard[]) => void;
  userID?: string | null;
}

export interface IFilter {
  datePost: string;
  jobType: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, userID }) => {
  const [jobs, setJobs] = useState<IJobCard[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<IFilter>({
    datePost: "",
    jobType: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [filteredHistory, setFilteredHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedSearchHistory = localStorage.getItem("searchHistory:" + userID);
    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory));
    }
  }, [userID]);

  useEffect(() => {
    if (searchHistory.length > 100) {
      setSearchHistory(searchHistory.slice(0, 100));
    }
    localStorage.setItem("searchHistory:" + userID, JSON.stringify(searchHistory));
    
  }, [searchHistory, userID]);

  const handleSearch = async (searchTerm?: string) => {
    const term = searchTerm || (document.getElementById("searchInput") as HTMLInputElement).value;

    // Add search term to search history
    if (term && !searchHistory.includes(term)) {
      setSearchHistory([term, ...searchHistory]);
    }

    try {
      const response = await axiosInstance.get(`/job/search`, {
        params: {
          query: term,
          ...currentFilters,
        },
      });
      const jobList = response.data.data.jobs || [];
      const companiesResponse = await axiosInstance.get("/company");
      const companies = companiesResponse.data.data || [];

      const updatedJobs = jobList.map((job: IJob) => {
        const company = companies.find(
          (company: { _id: string }) => company._id === job.company_id
        );
        return {
          ...job,
          company_name: company?.company_name,
          company_avatar: company?.avatar,
        };
      });

      setJobs(updatedJobs);
      onSearch(updatedJobs);
      setShowFilters(true);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleHistoryClick = (term: string) => {
    setSearchHistory([term, ...searchHistory.filter((item) => item !== term)]);
    (document.getElementById("searchInput") as HTMLInputElement).value = term;
    handleSearch(term);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilteredHistory(searchHistory.filter(term => term.toLowerCase().includes(value.toLowerCase())));
    setShowHistory(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };

    const searchInput = document.getElementById("searchInput");
    searchInput?.addEventListener("keydown", handleKeyDown);

    return () => {
      searchInput?.removeEventListener("keydown", handleKeyDown);
    };
  }, [jobs]);

  return (
    <div>
      <div
        className="search-bar"
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "100px 100px 30px 100px",
          position: "relative",
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
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 200)}
          onChange={handleInputChange}
        />
        <button
          onClick={() => handleSearch()}
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
        {showHistory && filteredHistory.length > 0 && (
            <ul
            style={{
              position: "absolute",
              top: "50px",
              width: "500px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              listStyleType: "none",
              padding: "0px 10px",
              marginLeft: "-115px",
              zIndex: 1000,
            }}
            >
            {filteredHistory.slice(0, 7).map((term, index) => (
              <li
              key={index}
              onClick={() => handleHistoryClick(term)}
              style={{
                padding: "5px 0",
                cursor: "pointer",
              }}
              >
              {term}
              </li>
            ))}
            </ul>
        )}
      </div>

      {showFilters && (
        <SearchFilters
          currentFilters={currentFilters}
          setCurrentFilters={setCurrentFilters}
        />
      )}

      <div
        className="sort-options"
        style={{
          display: "flex",
          justifyContent: "start",
          margin: "0px 100px",
        }}
      ></div>
    </div>
  );
};

export default SearchBar;