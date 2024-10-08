import { lazy } from "react";
import Login from "@/pages/Login";
import GeneralLayout from "@/layouts/GeneralLayout";
const Storage = lazy(() => import("@/pages/Storage"));
import ProtectedRoutes from "@/routes/ProtectedRoutes.tsx";

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
      element: (
        <ProtectedRoutes>
          <Storage />
        </ProtectedRoutes>
      ),
    },
  ],
};

export default GeneralRoutes;
