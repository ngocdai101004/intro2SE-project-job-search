import {Routes, Route} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home.tsx";
import ProtectedRoute from "./common/ProtectedRoute.tsx";
import AuthCode from "./pages/AuthCode.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="signin" element={<SignIn/>}/>
                <Route path="signup" element={<SignUp/>}/>
                <Route path="forgotpassword" element={<ForgotPassword/>}/>
                <Route path="authcode" element={<AuthCode/>}/>

                <Route path="home" element={
                    <ProtectedRoute>
                        <Home/>
                    </ProtectedRoute>
                }/>

                <Route path="*" element={<h1>Not Found</h1>}/>
            </Routes>
        </>
    );
}

export default App;
