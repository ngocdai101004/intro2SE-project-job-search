import {FormEvent, useState} from 'react';
import MyFooter from '../../components/MyFooter.tsx';
import MyHeader from '../../components/MyHeader.tsx';
import MyTextInput from '../../components/MyTextInput.tsx';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from "react-toastify";
import axiosInstance from "../../common/axiosInstance.tsx";
import {MyToastContainer} from "../../components/MyToastContainer.tsx";
import axios from "axios";

function ForgotPasswordEmail() {
    const navigate = useNavigate();
    const email = useParams().email;
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading('Verifying code...');
        try {
            await axiosInstance.post('/auth/reset_password', {email, code, password});
            navigate('/signin');
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.update(toastId, {
                    render: error.response.data?.message || 'An error occurred.',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
            } else {
                toast.update(toastId, {
                    render: 'Please try again.',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <MyHeader mydefaultActiveKey="/home"/>
            <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="card shadow-lg" style={{width: '100%', maxWidth: '400px'}}>
                    <div className="card-body p-4">
                        <h2 className="card-title text-center fw-bold mb-4">Forgot password</h2>

                        <small>
                            We've sent a 6-digit verification code to
                            <span className="fw-bold"> {email}</span>
                            . Please enter the code below to verify your identity.
                        </small>
                        <form onSubmit={handleSubmit}>

                            <div className="mb-2">
                                <MyTextInput label="Authentication code" type="number" id="number" placeholder="Code"
                                             value={code} setValue={setCode}/>
                            </div>

                            <div className="mb-2">
                                <MyTextInput label="New password" type="password" id="password" placeholder="Password"
                                             value={password} setValue={setPassword}/>
                            </div>


                            <button type="submit" className="btn btn-primary fw-bold w-100 mt-2">
                                Send
                            </button>
                        </form>

                        <button type="button" className="btn btn-secondary fw-bold w-100 mt-2"
                                onClick={() => navigate('/signin')}>
                            Back to sign in
                        </button>
                    </div>
                </div>
            </div>
            <MyToastContainer/>
            <MyFooter/>
        </div>
    );
};


export default ForgotPasswordEmail;