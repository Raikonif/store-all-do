import GeneralRoutes from "./GeneralRoutes.tsx";
import { useRoutes } from "react-router-dom";

function RoutesApp() {
  return useRoutes([GeneralRoutes]);
}

export default RoutesApp;
