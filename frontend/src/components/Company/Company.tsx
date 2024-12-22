import MyHeader from "../MyHeader";
import CompanyHeader from "./Header/CompanyHeader";

function Company() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <MyHeader />
      <CompanyHeader />
    </div>
  );
}

export default Company;
