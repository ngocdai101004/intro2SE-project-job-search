import { FormEvent, useState } from 'react';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';
import MyTextInput from '../components/MyTextInput';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(email);
        navigate('/signin');
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <MyHeader />
            <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="card shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                    <div className="card-body p-4">
                        <h2 className="card-title text-center fw-bold mb-4">Forgot password</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <MyTextInput label="Email address" type="email" id="email" placeholder="Enter email" value={email} setValue={setEmail} />
                            </div>

                            <small className="text-muted">
                                We’ll send a verification code to this email or phone number if it matches an existing LinkedIn account.
                            </small>

                            <button type="submit" className="btn btn-primary fw-bold w-100 mt-2">
                                Send
                            </button>
                        </form>

                        <button type="button" className="btn btn-secondary fw-bold w-100 mt-2" onClick={() => navigate('/signin')}>
                            Back to sign in
                        </button>
                    </div>
                </div>
            </div>
            <MyFooter />
        </div>
    );
};


export default ForgotPassword;