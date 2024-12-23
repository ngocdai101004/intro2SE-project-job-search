import { FormEvent, useState } from 'react';
import MyFooter from '../../components/MyFooter.tsx';
import MyHeader from '../../components/MyHeader.tsx';
import MyTextInput from '../../components/MyTextInput.tsx';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import axiosInstance from "../../common/axiosInstance.tsx";
import axios from "axios";
import {MyToastContainer} from "../../components/MyToastContainer.tsx";

function Verify() {
    const navigate = useNavigate();
    const [code, setCode] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading('Verifying...');

        try {
            const response = await axiosInstance.post('/auth/verify_account', { code });
            navigate('/home');
            console.log('Verify successfully:', response.data);
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
                    render: 'Verify failed. Please try again.',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
                console.log('Verify failed:', error);
            }
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <MyHeader mydefaultActiveKey={''} />
            <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="card shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                    <div className="card-body p-4">
                        <h2 className="card-title text-center fw-bold mb-4">Authenticate your email</h2>

                        <small className="text-muted">
                            We've sent a 6-digit verification code to your email/phone. Please enter the code below to
                            verify your identity.
                        </small>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <MyTextInput label="Authentication code" type="number" id="number" placeholder="Code"
                                             value={code} setValue={setCode}/>
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


export default Verify;