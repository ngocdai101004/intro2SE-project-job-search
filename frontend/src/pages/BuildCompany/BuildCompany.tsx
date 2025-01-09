import { useState } from "react";
import MyHeader from "../../components/MyHeader";
import ICompany from "../../interfaces/company.ts";
import CompanyForm from "./CompanyForm.tsx";

const companyInstance: ICompany = {};

const UserRegistrationForm: React.FC = () => {
  const [companyData, setCompanyData] = useState<ICompany>(companyInstance);

  return (
    <div>
      <MyHeader mydefaultActiveKey="/company" />
      <CompanyForm
        companyData={companyData}
        setCompanyData={setCompanyData}
        isCreating={true}
        _id={undefined}
      />
    </div>
  );
};

export default UserRegistrationForm;
