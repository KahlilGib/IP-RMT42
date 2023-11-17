import Register from "../views/Auth/Register";
import Login from "../views/Auth/Login";
import { createBrowserRouter , redirect} from "react-router-dom";


const router = createBrowserRouter([
  {
      path: "/register",
      element: <Register />,
    },
  {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Login />,
      loader: () => localStorage.access_token ? null : redirect("/login")
    },
  ]);

  export default router;