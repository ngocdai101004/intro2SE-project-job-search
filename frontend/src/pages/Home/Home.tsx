import MyHeader from "../../components/MyHeader.tsx";
import axiosInstance from "../../common/axiosInstance.tsx";
import {useNavigate} from "react-router-dom";

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
