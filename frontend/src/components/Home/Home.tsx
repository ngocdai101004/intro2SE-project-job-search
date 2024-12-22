import MyHeader from "../MyHeader";

const Home = () => {
  return (
    <div>
      <div className="d-flex flex-column min-vh-100">
        <MyHeader mydefaultActiveKey="/home" />
      </div>
    </div>
  );
};

export default Home;
