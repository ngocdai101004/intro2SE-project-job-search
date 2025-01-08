import UserProfileForm from "./UserProfileForm";


const BuildProfile = () => {
    return (
        <div className="container" style={{marginTop: '150px'}}>
        <UserProfileForm isFirstTime={true}/>
        </div>
    );
    };

export default BuildProfile;