import MyHeader from "../../components/MyHeader.tsx";
import axiosInstance from "../../common/axiosInstance.tsx";
// import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { IJobCard } from "../../interfaces/job.ts";
import { IJob } from "../../interfaces/job.ts";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import { Button } from "react-bootstrap";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Home = () => {
  // const navigate = useNavigate();
  const [jobs, setJobs] = useState<IJobCard[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJobCard | null>(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchJobs = async () => {
      try {
        const jobsResponse = await axiosInstance.get('/job/all');
        const jobList = jobsResponse.data.data.jobs || [];
        const companiesResponse = await axiosInstance.get('/company');
        const companies = companiesResponse.data.data || [];
        const updatedJobs = jobList.map((job: IJob) => {
          const company = companies.find((company: { _id: string }) => company._id === job.company_id);
          return {
            ...job,
            company_name: company?.company_name,
            company_avatar: company?.avatar,
          };
        });

        if (isMounted) {
          setJobs(updatedJobs);
        }
        setSelectedJob(updatedJobs[0]);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchJobs();
    return () => {
      isMounted = false; 
    };
  }, []);


  const handleSearch = (searchTerm: string) => {
    // Implement your search logic here, e.g., filter jobs based on searchTerm
    console.log("Searching for:", searchTerm);
  };

  return (
    <div>
      <div className="d-flex flex-column min-vh-100">
        <MyHeader mydefaultActiveKey="/home" className = "fixed-top" />
        
        <SearchBar onSearch={handleSearch} /> {/* Use the SearchBar component */}

        <div className="jobs-section text-center">
          <h2>Jobs for you</h2>
          <hr style={{ width: '80%', margin: '0 auto' }} />
        </div>

        <div className="container justify-content-center" style={{ marginTop: '20px' }}>
          <div className="row">
            <div className="col-md-5" style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {jobs.map((job: IJobCard) => (
                <div className="card mb-4 shadow-sm" key={job._id} onClick={() => setSelectedJob(job)}>
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold">{job.title}</h5>
                    <div className="d-flex align-items-center mb-2">
                      <img
                        src={job.company_avatar}
                        alt={job.company_name}
                        className="rounded-circle"
                        style={{ width: '20px', height: '20px', marginRight: '10px' }}
                      />
                      <span>{job.company_name}</span>
                    </div>
                    <div className="d-flex justify-content-start">
                      <p className="card-text" style={{ fontWeight: 'bold', marginRight: '20px', fontSize: '14px' }}>
                        {job.type}
                      </p>
                      <p className="card-text" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                        {job.location_type}
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <p className="card-text" style={{ fontWeight: 'lighter', marginRight: '20px', marginTop: '-20px' ,fontSize: '14px' }}>
                        {job.open_time ? (() => {
                          const createdDate = new Date(job.open_time);
                          const now = new Date();
                          const diffInMs = now.getTime() - createdDate.getTime();
                          const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
                          const diffInDays = Math.floor(diffInHours / 24);

                          if (diffInDays > 0) {
                            return `${diffInDays} days ago`;
                          } else {
                            return `${diffInHours} hours ago`;
                          }
                        })() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-7">
              {selectedJob && (
                <div className="card mb-2 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold">{selectedJob.title}</h5>
                    <div className="d-flex align-items-center mb-2">
                      <img
                        src={selectedJob.company_avatar}
                        alt={selectedJob.company_name}
                        className="rounded-circle"
                        style={{ width: '20px', height: '20px', marginRight: '10px' }}
                      />
                      <span>{selectedJob.company_name}</span>
                    </div>
                    <div className="d-flex justify-content-start">
                      <p className="card-text" style={{ fontWeight: 'bold', marginRight: '20px', fontSize: '14px' }}>
                        {selectedJob.type}
                      </p>
                      <p className="card-text" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                        {selectedJob.location_type}
                      </p>
                    </div>
                    <hr style={{ width: '100%', margin: '0' }} />
                    <div className="card-text" style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.5', marginTop: '10px' }}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {selectedJob.description}
                      </ReactMarkdown>
                    </div>
                    <div className="d-flex justify-content-end align-items-center" style={{ marginRight: '20px' }}>
                      <Button variant="primary" style={{ fontSize: "0.9rem" }}>
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
