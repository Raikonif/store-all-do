import GeneralRoutes from "./GeneralRoutes";
import { useRoutes } from "react-router-dom";

function RoutesApp() {
  return useRoutes([GeneralRoutes]);
}

export default RoutesApp;
