import { RouterProvider } from "react-router-dom";
import router from "./Route.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
