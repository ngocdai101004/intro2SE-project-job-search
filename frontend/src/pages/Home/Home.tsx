/* eslint-disable react-hooks/exhaustive-deps */
import MyHeader from "../../components/MyHeader.tsx";
import axiosInstance from "../../common/axiosInstance.tsx";
// import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { IJobCard } from "../../interfaces/job.ts";
import { IJob } from "../../interfaces/job.ts";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import "./Home.css";
import JobList from "../../components/JobCard/JobList.tsx";
import JobDetail from "../../components/JobCard/JobDetail.tsx";
import "./Home.css";
import { Col, Row } from "react-bootstrap";

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<IJobCard[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJobCard | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/auth/check");
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      try {
        let jobList = [];
        if (isAuthenticated) {
          const recommendedJobsResponse = await axiosInstance.get(
            "/job/recommended"
          );
          jobList = recommendedJobsResponse.data.data.jobs || [];
        } else {
          const jobsResponse = await axiosInstance.get("/job");
          jobList = jobsResponse.data.data.jobs || [];
        }

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

        if (isMounted) {
          setJobs(updatedJobs);
          if (!selectedJob && updatedJobs.length > 0) {
            setSelectedJob(updatedJobs[0]);
          }
        }

        console.log("Selected Job:", selectedJob);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div>
      <div className="d-flex flex-column vh-100">
        <MyHeader mydefaultActiveKey="/home" className="fixed-top" />

        <SearchBar onSearch={handleSearch} />

        <div className="jobs-section text-center">
          <h2>Jobs for you</h2>
          <hr style={{ width: "80%", margin: "0 auto" }} />
        </div>

        <div
          className="container justify-content-center flex-grow-1"
          style={{ marginTop: "15px" }}
        >
          <Row>
            <Col
              xs={4}
              style={{
                overflow: "scroll",
                scrollbarWidth: "none",
                height: "60vh",
              }}
            >
              <JobList
                jobs={jobs}
                selectedJob={selectedJob}
                onJobSelect={setSelectedJob}
              />
            </Col>
            <Col
              xs={8}
              style={{
                overflow: "scroll",
                scrollbarWidth: "none",
                height: "60vh",
              }}
            >
              {selectedJob && <JobDetail job={selectedJob} />}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;
