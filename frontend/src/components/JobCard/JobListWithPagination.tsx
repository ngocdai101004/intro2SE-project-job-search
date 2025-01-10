import React, { useState, useMemo } from 'react';
import { IJobCard } from "../../interfaces/job";
import JobListCard from './JobListCard';

interface JobListWithPaginationProps {
    jobs: IJobCard[];
    itemsPerPage?: number;
    onJobSelect: (job: IJobCard) => void;
    selectedJobId?: string | number;
}

const JobListWithPagination: React.FC<JobListWithPaginationProps> = ({
    jobs,
    itemsPerPage = 5,
    onJobSelect,
    selectedJobId
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.ceil(jobs.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = useMemo(() => {
        const numbers = [];
        for (let i = 1; i <= totalPages; i++) {
            numbers.push(i);
        }
        return numbers;
    }, [totalPages]);

    return (
        <div className="w-full">

            <div className="space-y-4">
                {currentJobs.map((job) => (
                    <JobListCard
                        key={job._id}
                        job={job}
                        isSelected={job._id === selectedJobId}
                        onClick={() => onJobSelect(job)}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="gap-1 mt-6"
                style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors me-1"
                        style={{
                            borderWidth: '1px',
                        }}
                    >
                        «
                    </button>

                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={`px-3 py-1 text-sm rounded min-w-[32px] me-1 ${
                                currentPage === number
                                    ? 'bg-primary text-white hover:bg-blue-600'
                                    : 'bg-gray-100 hover:bg-gray-200'
                            } transition-colors`}
                            style={
                                {
                                    borderWidth: '1px',
                                }
                            }
                            
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        style={{
                            borderWidth: '1px',
                        }}
                    >
                        »
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobListWithPagination;