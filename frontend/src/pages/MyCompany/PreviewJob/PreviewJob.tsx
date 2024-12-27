import React from "react";
import { useNavigate } from "react-router-dom";

const PreviewJob: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#e0e0e0",
      }}
    >
      <div
        style={{
          width: "700px",
          height: "550px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Ảnh và tiêu đề */}
        <div
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1,
            paddingBottom: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <img
              src="/preview-job.png"
              alt="Logo"
              style={{
                width: "40px",
                height: "40px",
                marginRight: "10px",
              }}
            />
            <div>
              <strong>
                <p style={{ fontSize: "20px", margin: 0, marginBottom: "1px" }}>
                  Job Post Review
                </p>
              </strong>
              <p style={{ fontSize: "12px", opacity: 0.6, margin: 0 }}>
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

        <div
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div>
              <strong>
                <p style={{ fontSize: "20px", marginBottom: "8px" }}>
                  Software Development Intern, Zalopay
                </p>
              </strong>
              <p style={{ marginBottom: "8px" }}>
                Ho Chi Minh City, Vietnam · 25 days ago · Over 100 applicants
              </p>
              <p style={{ marginBottom: "8px" }}>
                <strong>On-site</strong> · Full-time · Internship
              </p>
            </div>
            <button
              style={{
                padding: "12px 30px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
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

          <div
            style={{
              maxHeight: "250px",
              overflowY: "auto",
              paddingRight: "10px",
            }}
          >
            <strong>
              <p style={{ fontSize: "20px" }}>Responsibilities:</p>
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
              <p style={{ fontSize: "20px" }}>Requirements:</p>
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
              <p style={{ fontSize: "20px" }}>Perks:</p>
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
          style={{
            padding: "8px 12px",
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #000",
            fontWeight: "bold",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            whiteSpace: "nowrap",
          }}
          onClick={() => handleNavigation("/my-company/describe-job")}
        >
          Close Preview
        </button>
      </div>
    </div>
  );
};

export default PreviewJob;
