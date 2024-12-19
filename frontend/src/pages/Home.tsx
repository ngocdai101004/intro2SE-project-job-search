import {useNavigate} from "react-router-dom";
import MyButton from "../components/MyButton";
import axiosInstance from "../common/axiosInstance.tsx";
// import {useEffect} from "react";
import {ToastContainer, toast, Bounce} from 'react-toastify';


export default function Home() {
    const navigate = useNavigate();
    const notify = () => toast.error('Wow so easy!')

    return (
        <div>
            <MyButton className="btn btn-primary" text="Sign Up" onClick={() => navigate("/signup")}/>
            <MyButton className="btn btn-primary" text="Log out" onClick={async () => {
                try {
                    const response = await axiosInstance.get('/auth/logout');
                    navigate('/signin');
                    console.log('Logout successful:', response.data);
                } catch (error: unknown) {
                    console.log(error)
                }
            }}/>
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>vjp vjp vjp !</strong>
                <p>Change this and that and try again.</p>
                <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <button onClick={notify}>Notify!</button>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    )
}