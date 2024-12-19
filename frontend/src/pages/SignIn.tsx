import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';
import MyTextInput from '../components/MyTextInput';
import {FormEvent, useState} from "react";
import axiosInstance from "../common/axiosInstance.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {MyToastContainer} from "../components/MyToastContainer.tsx";





function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading('Signing in...');

        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            navigate('/home');
            console.log('Login successful:', response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.update(toastId, {
                    render: error.response.data?.message || 'An error occurred.',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                });
            } else {
                toast.update(toastId, {
                    render: 'Login failed. Please try again.',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
                console.log('Login failed:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <MyTextInput label="Email address" type="email" id="email" placeholder="Enter email" value={email} setValue={setEmail} />
            </div>

            <div className="mb-3">
                <MyTextInput label="Password" type="password" id="password" placeholder="Password" value={password} setValue={setPassword} />
            </div>

            <button type="submit" className="btn btn-primary fw-bold w-100">
                Sign In
            </button>
        </form>
    );
}



function SignIn() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <MyHeader />
            <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="card shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                    <div className="card-body p-4">
                        <h2 className="card-title text-center fw-bold mb-4">Sign In</h2>

                        <SignInForm />

                        <div className="d-flex justify-content-between mt-2">
                            <a href="signup" className="text-primary fw-bold text-decoration-none small">
                                Sign Up
                            </a>
                            <a href="forgotpassword" className="text-primary fw-bold text-decoration-none small">
                                Forgot password?
                            </a>
                        </div>

                        <div className="text-center mt-2">
                            <small className="text-muted">
                                Or sign in with social platforms
                            </small>
                            <div className='d-flex justify-content-between gap-3 mt-2'>
                                <button className="btn btn-light border border-1 border-dark flex-grow-1 fw-bold d-flex align-items-center justify-content-center">
                                    <img
                                        src="/google-logo.png"
                                        alt="Google"
                                        className="me-2"
                                        style={{ height: '24px', width: '24px' }}
                                    />
                                    Google
                                </button>
                                <button className="btn btn-light border border-1 border-dark flex-grow-1 fw-bold d-flex align-items-center justify-content-center">
                                    <img
                                        src="/facebook-logo.png"
                                        alt="Google"
                                        className="me-2"
                                        style={{ height: '24px', width: '24px' }}
                                    />
                                    Facebook
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <MyToastContainer />
            <MyFooter />
        </div>
    );
};



export default SignIn;