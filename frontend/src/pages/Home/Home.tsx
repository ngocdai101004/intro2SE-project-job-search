/* eslint-disable react-hooks/exhaustive-deps */
import MyHeader from "../../components/MyHeader.tsx";
import axiosInstance from "../../common/axiosInstance.tsx";
// import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { IJobCard } from "../../interfaces/job.ts";
import { IJob } from "../../interfaces/job.ts";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import "./Home.css";
// import JobList from "../../components/JobCard/JobList.tsx";
import JobListWithPagination from "../../components/JobCard/JobListWithPagination.tsx";
import JobDetail from "../../components/JobCard/JobDetail.tsx";
import "./Home.css";
import { Col, Row } from "react-bootstrap";
import SortBar from "./SortBar.tsx";

export interface ISortStatus {
  sortByRelavant: string;
  sortByDate: string;
  sortBySalary: string;
}
const Home: React.FC = () => {
  const [jobs, setJobs] = useState<IJobCard[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJobCard | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sortStatus, setSortStatus] = useState<ISortStatus>({
    sortByRelavant: "desc",
    sortByDate: "",
    sortBySalary: "",
  });
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/auth/check");
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserID(response.data.data.userID);
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

  useEffect(() => {
    const sortJobs = () => {
      const sortedJobs = [...jobs];

      if (sortStatus.sortBySalary === "asc") {
        sortedJobs.sort((a, b) => {
          if (!a.salary && !b.salary) return 0;
          if (!a.salary) return -1;
          if (!b.salary) return 1;
          return a.salary.max - b.salary.max;
        });
      } else if (sortStatus.sortBySalary === "desc") {
        sortedJobs.sort((a, b) => {
          if (!a.salary && !b.salary) return 0;
          if (!a.salary) return 1;
          if (!b.salary) return -1;
          return b.salary.max - a.salary.max;
        });
      }

      if (sortStatus.sortByDate === "desc") {
        sortedJobs.sort((a, b) => new Date(a.open_time).getTime() - new Date(b.open_time).getTime());
      } else if (sortStatus.sortByDate === "asc") {
        sortedJobs.sort((a, b) => new Date(b.open_time).getTime() - new Date(a.open_time).getTime());
      }

      setJobs(sortedJobs);
      if (sortedJobs.length > 0) {
        setSelectedJob(sortedJobs[0]);
      }
    };

    sortJobs();
  }
  , [sortStatus]);

  
  const handleSearch = (searchedJobs: IJobCard[]) => {
    console.log("Searched Jobs in Home", searchedJobs);
    setJobs(searchedJobs);
    setSelectedJob(searchedJobs[0]);
  };


  console.log("Jobs in Home", jobs);
  return (
    <div>
      <div className="d-flex flex-column vh-100">
        <MyHeader mydefaultActiveKey="/home" className="fixed-top" />

        <SearchBar onSearch={handleSearch} userID={(userID !== "" ? userID : null)} />
        <SortBar sortStatus={sortStatus} setSortStatus={setSortStatus} />

        <div className="jobs-section text-center">
          <h2>Jobs for you</h2>
          <hr style={{ width: "80%", margin: "0 auto" }} />
        </div>
        {jobs.length === 0 && (
          <div className="no-jobs-message" style={{ textAlign: "center", marginTop: "20px" }}>
            <h5>No jobs available at the moment. Please check back later.</h5>
          </div>
        )}
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
                height: "100vh",
              }}
            >
              {/* <JobList
                jobs={jobs}
                selectedJob={selectedJob}
                onJobSelect={setSelectedJob}
              /> */}
            <JobListWithPagination
              jobs={jobs}
              itemsPerPage={5}
              onJobSelect={setSelectedJob}
              selectedJobId={selectedJob?._id}
            />
            </Col>
            <Col
              xs={8}
              style={{
                overflow: "scroll",
                scrollbarWidth: "none",
                height: "100vh",
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
