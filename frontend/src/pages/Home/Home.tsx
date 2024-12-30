import MyHeader from "../../components/MyHeader.tsx";
import axiosInstance from "../../common/axiosInstance.tsx";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();
    const handdleClick = async () => {
        try{
            await axiosInstance.get('/auth/logout');
            navigate('/signin');
        }
        catch (error: unknown) {
            console.log(error)
        }
    };

    // Check if the user is logged in by jwt token
    // If not, redirect to the login page
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                await axiosInstance.get('/auth/check');
            } catch (error) {
                navigate('/signin');
            }
        };
        checkLoggedIn();
    }, []);

    
  return (
    <div>
      <div className="d-flex flex-column min-vh-100">
        <MyHeader mydefaultActiveKey="/home" />
          <button onClick={handdleClick}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
