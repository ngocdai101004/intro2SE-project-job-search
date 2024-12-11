import { FormEvent, useState } from 'react';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';
import MyTextInput from '../components/MyTextInput';

function SignUp() {

    return (
        <div className="d-flex flex-column min-vh-100">
            <MyHeader />
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
            <MyFooter />
        </div >
    );
}

function SignUpForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Sign Up attempt with:', { firstName, lastName, email, phone, password, confirmPassword });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <div className="col">
                    <MyTextInput label="First name" type="name" id="first_name" placeholder="First name" value={firstName} setValue={setFirstName} />
                </div>
                <div className="col">
                    <MyTextInput label="Last name" type="name" id="last_name" placeholder="Last name" value={lastName} setValue={setLastName} />
                </div>
            </div>

            <div className="mb-3">
                <MyTextInput label="Email address" type="email" id="email" placeholder="Enter email" value={email} setValue={setPhone} />
            </div>

            <div className="mb-3">
                <MyTextInput label="Phone number" type="phone" id="phone" placeholder="Enter phone" value={phone} setValue={setEmail} />
            </div>

            <div className="mb-3">
                <MyTextInput label="Password" type="password" id="password" placeholder="Password" value={password} setValue={setPassword} />
            </div>

            <div className="mb-3">
                <MyTextInput label="Confirm password" type="password" id="confirm_password" placeholder="Confirm password" value={confirmPassword} setValue={setConfirmPassword} />
            </div>

            <button type="submit" className="btn btn-primary fw-bold w-100">
                Sign Up
            </button>

        </form>
    )
}

export default SignUp;
