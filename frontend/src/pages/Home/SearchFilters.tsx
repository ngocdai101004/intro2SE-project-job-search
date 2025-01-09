import React from 'react';
import { IFilter } from './SearchBar';

interface SearchFiltersProps {
  currentFilters: IFilter;
  setCurrentFilters: (filters: IFilter) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ currentFilters, setCurrentFilters }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentFilters({
      ...currentFilters,
      [name]: value,
    });
  };

  return (
    <div
      className="filters-container"
      style={{
        padding: '0px',
        borderRadius: '8px',
        margin: '0 100px 20px 100px',
        
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
    
        }}
      >
        <div className="filter-group">
          <select
            name="datePost"
            onChange={handleFilterChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              backgroundColor: '#f8f9fa'
            }}
          >
            <option value="">Date Posted</option>
            <option value="1">Last 24 hours</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            name="jobType"
            onChange={handleFilterChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              backgroundColor: '#f8f9fa'
            }}
          >
            <option value="">Job Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            name="location"
            onChange={handleFilterChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              backgroundColor: '#f8f9fa'
            }}
          >
            <option value="" >Location</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="filter-group">
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <input
              type="number"
              name="salaryMin"
              placeholder="Salary: Min"
              onChange={handleFilterChange}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                backgroundColor: '#f8f9fa'

              }}
            />
            <input
              type="number"
              name="salaryMax"
              placeholder="Salary: Max"
              onChange={handleFilterChange}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                backgroundColor: '#f8f9fa'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;