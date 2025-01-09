// SearchBar.tsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../common/axiosInstance";
import { IJob } from "../../interfaces/interfaces";
import { IJobCard } from "../../interfaces/job";

interface SearchBarProps {
  onSearch: (searchedJobs: IJobCard[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [jobs, setJobs] = useState<IJobCard[]>([]);

  const handleSearch = async () => {
    const searchTerm = (
      document.getElementById("searchInput") as HTMLInputElement
    ).value;
    try {
      const response = await axiosInstance.get(`/job/search`, {
        params: { query: searchTerm },
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
      onSearch(jobs);
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
  }, []);

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