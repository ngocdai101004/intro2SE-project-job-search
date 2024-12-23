import { FormEvent, useState } from "react";
import MyFooter from "../components/MyFooter";
import MyHeader from "../components/MyHeader";
import MyTextInput from "../components/MyTextInput";
import { useNavigate } from "react-router-dom";
import { MyToastContainer } from "../components/MyToastContainer.tsx";
import { toast } from "react-toastify";
import axiosInstance from "../common/axiosInstance.tsx";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Sending verification code...");
    try {
      const response = await axiosInstance.post("/auth/get_code", { email });
      navigate("/forgotpassword/" + email);
      console.log(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.update(toastId, {
          render: error.response.data?.message || "An error occurred.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: "Failed to send verification code. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.log("Failed to send verification code:", error);
      }
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <MyHeader mydefaultActiveKey="/home" />
      <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
        <div
          className="card shadow-lg"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <div className="card-body p-4">
            <h2 className="card-title text-center fw-bold mb-4">
              Forgot password
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <MyTextInput
                  label="Email address"
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  setValue={setEmail}
                />
              </div>

              <small className="text-muted">
                We’ll send a verification code to this email or phone number if
                it matches an existing account.
              </small>

              <button
                type="submit"
                className="btn btn-primary fw-bold w-100 mt-2"
              >
                Send
              </button>
            </form>

            <button
              type="button"
              className="btn btn-secondary fw-bold w-100 mt-2"
              onClick={() => navigate("/signin")}
            >
              Back to sign in
            </button>
          </div>
        </div>
      </div>
      <MyToastContainer />
      <MyFooter />
    </div>
  );
}

export default ForgotPassword;
