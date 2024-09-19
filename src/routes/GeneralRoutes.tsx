import Login from "../pages/Login.tsx";
import GeneralLayout from "../layouts/GeneralLayout.tsx";
import Storage from "../pages/Storage.tsx";

const GeneralRoutes = {
  path: "",
  element: <GeneralLayout />,
  children: [
    {
      path: "",
      element: <Login />,
    },
    {
      path: "storage",
      element: <Storage />,
    },
  ],
};

export default GeneralRoutes;
