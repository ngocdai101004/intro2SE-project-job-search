import { Routes, Route } from "react-router"
import Signin from "../components/Signin/Signin";
import Signup from "../components/Signup/Signup";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/signin" element={<Signin/>} />
            <Route path="/signup" element={<Signup/>} />
        </Routes>
    )
}

export default AppRoutes;