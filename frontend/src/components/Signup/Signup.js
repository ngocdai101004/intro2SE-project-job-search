import React from "react";
import "./Signup.scss";

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign up</h2>
        <form>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First name"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone number
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32 5H4C1.791 5 0 6.791 0 9V27C0 29.209 1.791 31 4 31H32C34.209 31 36 29.209 36 27V9C36 6.791 34.209 5 32 5Z"
                    fill="#DA251D"
                  />
                  <path
                    d="M19.753 16.0366L18 10.6416L16.247 16.0366H10.575L15.164 19.3696L13.411 24.7646L18 21.4306L22.589 24.7646L20.836 19.3696L25.425 16.0366H19.753Z"
                    fill="#FFFF00"
                  />
                </svg>

                <i
                  className="fa-solid fa-chevron-down mx-1"
                  style={{ fontSize: "10px" }}
                ></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                placeholder="Phone number"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm password"
            />
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary px-3">
              Continue
              <i
                className="fa-solid fa-arrow-right-long"
                style={{ paddingLeft: "5px", fontSize: "13px" }}
              ></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
