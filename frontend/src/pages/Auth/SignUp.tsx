import { FormEvent, useState } from 'react';
import MyFooter from '../../components/MyFooter.tsx';
import MyHeader from '../../components/MyHeader.tsx';
import MyTextInput from '../../components/MyTextInput.tsx';
import axiosInstance from '../../common/axiosInstance.tsx';
import {toast} from "react-toastify";
import axios from "axios";
import {MyToastContainer} from "../../components/MyToastContainer.tsx";
import {useNavigate} from "react-router-dom";

function SignUp() {

    return (
        <div className="d-flex flex-column min-vh-100">
            <MyHeader mydefaultActiveKey={''} />
            <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="card shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                    <div className="card-body p-4">
                        <h2 className="card-title text-center fw-bold mb-4">Sign Up</h2>
                        <SignUpForm />
                        <div className="text-center mt-3">
                            <small className="text-muted">
                                Already have an account? <a href="signin" className="text-primary fw-bold text-decoration-none">Sign In</a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <MyToastContainer />
            <MyFooter />
        </div >
    );
}

function SignUpForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Display loading toast
        const toastId = toast.loading('Signing up...');

        if (password !== confirmPassword) {
            // Handle password mismatch
            toast.update(toastId, {
                render: 'Passwords do not match.',
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
            return; // Exit the function
        }

        try {
            // API call to register
            const response = await axiosInstance.post('/auth/register', {
                first_name: firstName,
                last_name: lastName,
                email,
                password
            });
            navigate('/verify');
            console.log('Register successful:', response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                // Display error from server
                toast.update(toastId, {
                    render: error.response.data?.message || 'An error occurred.',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
            } else {
                // Handle general error
                toast.update(toastId, {
                    render: 'Sign up failed. Please try again.',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
                console.error('Sign up failed:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <div className="col">
                    <MyTextInput
                        label="First name"
                        type="text"
                        id="first_name"
                        placeholder="First name"
                        value={firstName}
                        setValue={setFirstName}
                    />
                </div>
                <div className="col">
                    <MyTextInput
                        label="Last name"
                        type="text"
                        id="last_name"
                        placeholder="Last name"
                        value={lastName}
                        setValue={setLastName}
                    />
                </div>
            </div>

            <div className="mb-3">
                <MyTextInput
                    label="Email address"
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    setValue={setEmail}
                />
            </div>

            <div className="mb-3">
                <MyTextInput
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                />
            </div>

            <div className="mb-3">
                <MyTextInput
                    label="Confirm password"
                    type="password"
                    id="confirm_password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                />
            </div>

            <button type="submit" className="btn btn-primary fw-bold w-100">
                Sign Up
            </button>
        </form>
    );
}


export default SignUp;
