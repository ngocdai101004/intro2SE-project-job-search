import React, { useState, useEffect } from "react";
import axiosInstance from "../../common/axiosInstance"; // Ensure axiosInstance is correctly configured
import { IJob } from "../../interfaces/interfaces";
import { IJobCard } from "../../interfaces/job";
import SearchFilters from "./SearchFilters";


interface SearchBarProps {
  onSearch: (searchedJobs: IJobCard[]) => void;
}

export interface IFilter {
  datePost: string;
  jobType: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [jobs, setJobs] = useState<IJobCard[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<IFilter>({
    datePost: "",
    jobType: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
  });


  const handleSearch = async () => {
    console.log("Filters in Handle Search", currentFilters);
    const searchTerm = (
      document.getElementById("searchInput") as HTMLInputElement
    ).value;
    try {
      const response = await axiosInstance.get(`/job/search`, {
        params: {
          query: searchTerm,
          ...currentFilters,
        },
      });
      const jobList = response.data.data.jobs || [];
      console.log("Jobs before get company:", jobList);
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

      console.log("Updated Jobs:", updatedJobs);

      setJobs(updatedJobs);
      onSearch(updatedJobs);
      setShowFilters(true);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
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
      >
    
      </div>
    </div>
  );
};

export default SearchBar;