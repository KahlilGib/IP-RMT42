import Register from "../views/Auth/Register";
import Login from "../views/Auth/Login";
import { createBrowserRouter , redirect} from "react-router-dom";
import HomePage from "../views/HomePage";
import { DetailGadgetPage } from "../views/DetailGadget";


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
      element: <HomePage />,
      loader: () => localStorage.access_token ? null : redirect("/login")
    },
    {
      path: "/gadget/:id",
      element: <DetailGadgetPage />,
    },
  ]);

  export default router;