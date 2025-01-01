import React from "react";
import { useNavigate } from "react-router-dom";
import "./PreviewJob.css";

const PreviewJob: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="preview-job">
      <div className="preview-job-container">
        {/* Ảnh và tiêu đề */}
        <div className="preview-job-header">
          <div className="preview-job-header-content">
            <img src="/preview-job.png" alt="Logo" />
            <div>
              <strong>
                <p className="preview-job-header-content-title">
                  Job Post Review
                </p>
              </strong>
              <p className="preview-job-header-content-description">
                The live post people view may look slightly different.
              </p>
            </div>
          </div>
          <hr
            style={{
              marginBottom: "5px",
              marginLeft: "-20px",
              marginRight: "-20px",
            }}
          />
        </div>

        <div className="preview-job-content">
          <div className="preview-job-content-header">
            <div className="preview-job-content-header-left">
              <strong>
                <p style={{ fontSize: "20px" }}>
                  Software Development Intern, Zalopay
                </p>
              </strong>
              <p>
                Ho Chi Minh City, Vietnam · 25 days ago · Over 100 applicants
              </p>
              <p>
                <strong>On-site</strong> · Full-time · Internship
              </p>
            </div>
            <button className="preview-job-content-header-right">
              Apply Now
            </button>
          </div>

          <hr
            style={{
              marginBottom: "5px",
              marginTop: "-10px",
              marginLeft: "-10px",
              marginRight: "-10px",
            }}
          />

          <div className="preview-job-content-description">
            <strong>
              <p>Responsibilities:</p>
            </strong>
            <ul>
              <li>
                Collaborate with teammates you may never see in person, bonding
                over GIFs and memes.
              </li>
              <li>
                Engage in ritualistic ceremonies, aka stand-ups, where you
                promise to finish yesterday's tasks today.
              </li>
              <li>
                Master the ancient art of code review, where you’ll say things
                like, "This needs more comments" and "Why are there 1000 lines
                in this function?"
              </li>
              <li>
                Implement "cutting-edge" solutions that are actually held
                together by duct tape and caffeine.
              </li>
            </ul>

            <strong>
              <p>Requirements:</p>
            </strong>
            <ul>
              <li>2+ years of JavaScript (yes, it’s always JavaScript).</li>
              <li>
                Ability to write “Hello World” in any language when questioned
                by non-tech relatives.
              </li>
              <li>
                Familiarity with buzzwords like “synergy”, “blockchain”, and
                “agile”.
              </li>
              <li>Must bring your own rubber duck for debugging.</li>
            </ul>

            <strong>
              <p>Perks:</p>
            </strong>
            <ul>
              <li>Flexible hours to match your nocturnal coding habits.</li>
              <li>
                Infinite coffee, occasional snacks, and regular existential
                crises.
              </li>
              <li>Payment in experience, and also money.</li>
            </ul>
          </div>
        </div>

        <button
          className="preview-job-close"
          onClick={() => handleNavigation("/my-company/describe-job")}
        >
          Close Preview
        </button>
      </div>
    </div>
  );
};

export default PreviewJob;
