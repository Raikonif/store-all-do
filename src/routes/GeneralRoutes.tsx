import Login from "@/pages/Login";
import GeneralLayout from "@/layouts/GeneralLayout";
import Storage from "@/pages/Storage";

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
