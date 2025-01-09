import MyHeader from "../../components/MyHeader";
import CompanyForm from "./CompanyForm.tsx";

const UserRegistrationForm: React.FC = () => {
  return (
    <div>
      <MyHeader mydefaultActiveKey="/company" />
      <CompanyForm />
    </div>
  );
};

export default UserRegistrationForm;
